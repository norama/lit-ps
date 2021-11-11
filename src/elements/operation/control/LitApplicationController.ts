import { ReactiveController, ReactiveControllerHost } from 'lit';
import { createRef } from 'lit/directives/ref.js';

import { config } from '../../config';
import { ResultDisplay } from '../../elements';
import { LitApplicationPS } from '../ps/LitApplicationPS';

export class LitApplicationController implements ReactiveController {
    host: ReactiveControllerHost;

    psRef = createRef<LitApplicationPS>();

    resultRef = createRef<ResultDisplay>();

    types = config.types;

    type = '';

    res = '';

    ping = '';

    score = 0;

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this);
    }

    set result(result: string) {
        this.res = result;
        if (this.res === this.type) {
            this.score++;
        }
        this.ping = '';
    }

    get result() {
        return this.res;
    }

    handleTypeChange = (type: string) => {
        this.type = type;
    };

    handleResult = (result: string) => {
        this.result = result;

        this.host.requestUpdate();
        this.resultRef.value?.blink();
    };

    handlePing = (result: string) => {
        this.ping = result;

        this.host.requestUpdate();
        this.resultRef.value?.blink();
    };

    handleDraw = () => {
        this.psRef.value?.draw(this.types);
    };

    handleCheat = () => {
        this.handleResult(this.type);
    };

    handleDisable = () => {
        this.psRef.value?.disable();
    };

    handleReset = () => {
        this.res = '';
        this.ping = '';
        this.score = 0;

        this.host.requestUpdate();
    };

    hostConnected() {}

    hostDisconnected() {}
}
