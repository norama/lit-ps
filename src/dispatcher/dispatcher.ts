import { config } from './config';
import { dot, M, S, shift, T, undot } from './constants';
import {
    log,
    logCancel,
    logPublish,
    logSubscribe,
    logSubscribeOnce
} from './log';

let PS = Object.create(PubSub);

PS.publish = (msg: string, data: object) => {
    logPublish(msg, data);
    PubSub.publish(msg, data);
};

PS.subscribe = (m: string, f: (msg: string, data: any) => void) => {
    logSubscribe(m, f);
    PubSub.subscribe(m, f);
};

PS.subscribeOnce = (m: string, f: (msg: string, data: any) => void) => {
    logSubscribeOnce(m, f);
    PubSub.subscribeOnce(m, f);
};

PS.publishRequest = (
    request: () => Promise<any>,
    type: string,
    id?: string
) => {
    PS.publish(dot(M.REQUEST, type, id), { request });
};

PS.publishState = (state: object, type: string, id?: string) => {
    PS.publish(dot(M.STATE, type, id), state);
};

PS.broadcast = (msg: string, data: object) => {
    PS.publish(dot(M.BROADCAST, msg), data);
};

PS.subscribeRequest = (type: string, f: (msg: string, data: any) => void) => {
    return PS.subscribe(dot(M.BROADCAST, M.REQUEST, type), f);
};

PS.subscribeState = (type: string, f: (msg: string, state: any) => void) => {
    return PS.subscribe(dot(M.BROADCAST, M.STATE, type), f);
};

PS.ping = (msg: string, f: (msg: string, data: any) => void) => {
    PS.subscribeOnce(dot(M.BROADCAST, M.PING, msg), f);
    setTimeout(() => {
        PS.publish(dot(M.PING, msg));
    }, config.timeout.ping);
};

PS.pingRequest = (msg: string, f: (msg: string, data: any) => void) => {
    PS.ping(dot(M.REQUEST, msg), f);
};

PS.pingState = (msg: string, f: (msg: string, data: any) => void) => {
    PS.ping(dot(M.STATE, msg), f);
};

class Dispatcher {
    store: { [key: string]: any } = {};
    cancelTimestamp = 0;

    constructor() {
        this.subscribe();
    }

    checkTimestamp = (timestamp: number) => {
        if (timestamp < this.cancelTimestamp) {
            logCancel();
            return false;
        }
        return true;
    };

    subscribe = () => {
        PS.subscribe(M.REQUEST, (msg: string, { request }: any) => {
            const requestTimestamp = Date.now();
            if (!this.checkTimestamp(requestTimestamp)) {
                return;
            }
            PS.broadcast(msg, { status: S.STARTED });
            request()
                .then((result: any) => {
                    if (!this.checkTimestamp(requestTimestamp)) {
                        return;
                    }
                    this.store[msg] = { result };
                    PS.broadcast(msg, { status: S.ENDED, result });
                })
                .catch((error: any) => {
                    if (!this.checkTimestamp(requestTimestamp)) {
                        return;
                    }
                    this.store[msg] = { error };
                    PS.broadcast(msg, { status: S.ENDED, error });
                });
        });

        PS.subscribe(M.STATE, (msg: string, state: any) => {
            if (state) {
                this.store[msg] = state;
                PS.broadcast(msg, state);
            }
        });

        PS.subscribe(M.PING, (msg: string) => {
            const state = this.store[shift(msg)];
            if (state) PS.broadcast(msg, state);
        });

        PS.subscribe(M.CANCEL, (msg: string) => {
            this.cancelTimestamp = Date.now();
            log('CANCEL', 'TIMESTAMP', this.cancelTimestamp);
        });
    };
}

new Dispatcher();

window.PS = PS;

window.Dispatch = {
    M,
    S,
    T,
    dot,
    undot
};
