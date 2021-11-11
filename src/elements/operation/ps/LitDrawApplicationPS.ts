import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { config } from '../../config';
import { draw } from '../../util/draw';
import { log } from '../../util/log';

const PS = window.PS;
const { M, T, S } = window.Dispatch;

@customElement('lit-draw-application-ps')
export class LitDrawApplicationPS extends LitElement {
    @property()
    onDraw = () => {};

    drawToken?: any;

    timer?: ReturnType<typeof setInterval>;

    connectedCallback() {
        super.connectedCallback();

        this.drawToken = PS.subscribeRequest(
            T.DRAW,
            (msg: string, data: any) => {
                if (data.status === S.STARTED) {
                    this.onDraw();
                }
            }
        );
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.clearTimer();

        if (this.drawToken) {
            PS.unsubscribe(this.drawToken);
        }
    }

    public start() {
        if (this.timer) {
            return;
        }

        this.timer = setInterval(() => {
            PS.publishRequest(() => draw(config.types), T.DRAW);
        }, config.timeout.step);
    }

    public stop() {
        this.clearTimer();
    }

    public reset() {
        this.clearTimer();

        PS.publishState({}, T.RESET);
        PS.publish(M.CANCEL);
    }

    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
        }
    }

    render() {
        log('RENDER', 'LitDrawApplicationPS');
        return null;
    }
}
