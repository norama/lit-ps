import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { LitApplicationController } from '../../operation/control/LitApplicationController';
import { log } from '../../util/log';

@customElement('lit-application')
export class LitApplication extends LitElement {
    set type(val: string) {
        this.controller.handleTypeChange(val);
    }

    @property()
    get type() {
        return this.controller.type;
    }

    @state()
    disabled = false;

    controller = new LitApplicationController(this);

    render() {
        log('RENDER', 'LitApplication');
        return html`
            <app-layout>
                <div slot="label">
                    <center-layout><lit-label>Lit</lit-label></center-layout>
                </div>
                <div slot="score">
                    <center-layout>
                        <score-display>${this.controller.score}</score-display>
                    </center-layout>
                </div>

                <div slot="type-selector">
                    <center-layout>
                        <type-selector
                            type=${this.controller.type}
                            .types=${this.controller.types}
                            .onTypeChange=${this.controller.handleTypeChange}
                            .disabled=${this.disabled}
                        ></type-selector>
                    </center-layout>
                </div>
                <div slot="action-buttons">
                    <row-layout-between>
                        <action-button
                            @click=${!this.disabled
                                ? this.controller.handleDraw
                                : undefined}
                            .disabled=${this.disabled}
                        >
                            DRAW
                        </action-button>
                        <action-button
                            @click=${!this.disabled
                                ? this.controller.handleCheat
                                : undefined}
                            .disabled=${this.disabled}
                        >
                            CHEAT
                        </action-button>
                        <action-button
                            @click=${!this.disabled
                                ? this.controller.handleDisable
                                : undefined}
                            .disabled=${this.disabled}
                        >
                            DISABLE
                        </action-button>
                    </row-layout-between>
                </div>
                <div slot="result">
                    <center-layout>
                        <result-display
                            ${ref(this.controller.resultRef)}
                            .color=${this.controller.ping ? 'red' : 'black'}
                        >
                            ${this.controller.ping || this.controller.res}
                        </result-display>
                    </center-layout>
                </div>
            </app-layout>
            <lit-application-ps
                .onResult=${this.controller.handleResult}
                .onPing=${this.controller.handlePing}
                .onReset=${this.controller.handleReset}
                .onDisable=${() => (this.disabled = true)}
                .onEnable=${() => (this.disabled = false)}
                ${ref(this.controller.psRef)}
            ></lit-application-ps>
        `;
    }
}
