import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { v4 as uuid } from 'uuid';

import { config } from '../../config';
import { draw } from '../../util/api';
import { log } from '../../util/log';

const PS = window.PS;
const { S, T } = window.Dispatch;

type TState = 'IDLE' | 'DISABLED' | 'PING';

@customElement('lit-application-ps')
export class LitApplicationPS extends LitElement {
    @property()
    onResult = (result: string) => {};

    @property()
    onPing = (result: string) => {};

    @property()
    onDisable = () => {};

    @property()
    onEnable = () => {};

    @property()
    onReset = () => {};

    id = uuid();

    drawToken?: any;
    disableToken?: any;
    enableToken?: any;
    resetToken?: any;

    timer?: ReturnType<typeof setTimeout>;

    state: TState = 'IDLE';

    connectedCallback() {
        super.connectedCallback();

        this.drawToken = PS.subscribeRequest(
            T.DRAW,
            (msg: string, data: any) => {
                if (this.state === 'DISABLED') {
                    return;
                }
                this.state = 'IDLE';

                log(T.DRAW, data.status, data.result);
                if (data.status === S.ENDED) {
                    if (data.result) {
                        this.onResult(data.result);
                    }
                    if (data.error) {
                        this.onResult('');
                        console.error(data.error);
                    }
                }
            }
        );

        this.disableToken = PS.subscribeState(
            T.DISABLE,
            (msg: string, state: any) => {
                if (this.state === 'DISABLED') {
                    return;
                }

                if (state.sender !== this.id) {
                    this.state = 'DISABLED';
                    this.onResult('');
                    this.onDisable();
                } else {
                    if (!this.timer) {
                        this.timer = setTimeout(() => {
                            PS.publishState(
                                { sender: this.id },
                                T.ENABLE,
                                this.id
                            );
                            this.timer = undefined;
                        }, config.timeout.disable);
                    }
                }
            }
        );

        this.enableToken = PS.subscribeState(
            T.ENABLE,
            (msg: string, state: any) => {
                if (state.sender !== this.id) {
                    if (this.state !== 'DISABLED') {
                        return;
                    }
                    this.state = 'PING';
                    this.onEnable();
                    PS.pingRequest(T.DRAW, (msg: string, data: any) => {
                        if (this.state === 'PING') {
                            this.state = 'IDLE';
                            this.onPing(data.result);
                        }
                    });
                }
            }
        );

        this.resetToken = PS.subscribeState(
            T.RESET,
            (msg: string, state: any) => {
                this.reset();
            }
        );
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.clearTimer();

        if (this.drawToken) {
            PS.unsubscribe(this.drawToken);
        }
        if (this.disableToken) {
            PS.unsubscribe(this.disableToken);
        }
        if (this.enableToken) {
            PS.unsubscribe(this.enableToken);
        }
    }

    public draw(types: string[]) {
        if (this.state === 'DISABLED') {
            return;
        }
        PS.publishRequest(() => draw(types), T.DRAW);
    }

    public disable() {
        if (this.state === 'DISABLED') {
            return;
        }
        PS.publishState({ sender: this.id }, T.DISABLE, this.id);
    }

    public reset() {
        this.state = 'IDLE';
        this.onEnable();
        this.onReset();
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
    }

    render() {
        log('RENDER', 'LitApplicationPS');
        return null;
    }
}
