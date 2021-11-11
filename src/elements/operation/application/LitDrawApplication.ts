import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

import { log } from '../../util/log';
import { LitDrawApplicationPS } from '../ps/LitDrawApplicationPS';

@customElement('lit-draw-application')
export class LitDrawApplication extends LitElement {
    psRef = createRef<LitDrawApplicationPS>();

    @state()
    inProgress = false;

    @state()
    count = 0;

    @state()
    maxCount = 10;

    handleStart = () => {
        this.count = 0;
        this.inProgress = true;
        this.psRef.value?.start();
    };

    handleStop = () => {
        this.inProgress = false;
        this.psRef.value?.stop();
    };

    handleReset = () => {
        this.count = 0;
        this.inProgress = false;
        this.psRef.value?.reset();
    };

    handleIncrement = () => {
        this.count++;
        if (this.count >= this.maxCount) {
            this.handleStop();
        }
    };

    render() {
        log('RENDER', 'LitDrawApplication');
        return html`
            <app-draw-layout>
                <div slot="count">
                    <center-layout>
                        <score-display>${this.count}</score-display>
                    </center-layout>
                </div>

                <div slot="input">
                    <center-layout>
                        <max-count-input
                            .value=${this.maxCount}
                            .onMaxCountChange=${(maxCount: number) =>
                                (this.maxCount = maxCount)}
                            .disabled=${this.inProgress}
                        ></max-count-input>
                    </center-layout>
                </div>
                <div slot="action-buttons">
                    <row-layout>
                        <action-button
                            @click=${!this.inProgress
                                ? this.handleStart
                                : undefined}
                            .disabled=${this.inProgress}
                        >
                            START
                        </action-button>
                        <action-button
                            @click=${this.inProgress
                                ? this.handleStop
                                : undefined}
                            .disabled=${!this.inProgress}
                        >
                            STOP
                        </action-button>
                        <action-button
                            @click=${!this.inProgress
                                ? this.handleReset
                                : undefined}
                            .disabled=${this.inProgress}
                        >
                            RESET
                        </action-button>
                    </row-layout>
                </div>
            </app-draw-layout>
            <lit-draw-application-ps
                .onDraw=${this.handleIncrement}
                ${ref(this.psRef)}
            ></lit-draw-application-ps>
        `;
    }
}
