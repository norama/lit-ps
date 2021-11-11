import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

import { MainTestApplicationController } from '../../control/test/MainTestApplicationController';
import { LitApplicationPS } from '../../ps/LitApplicationPS';
import { LitApplication } from '../LitApplication';

@customElement('main-test-application')
export class MainTestApplication extends LitElement {
    aRef = createRef<LitApplication>();
    bRef = createRef<LitApplication>();

    psRef = createRef<LitApplicationPS>();
    ps2Ref = createRef<LitApplicationPS>();

    controller = new MainTestApplicationController(this);

    constructor() {
        super();

        (window as any).litTest = true;
    }

    render() {
        return html`
            <main-test-layout>
                <lit-application
                    ${ref(this.aRef)}
                    type="A"
                    slot="app1"
                ></lit-application>
                <lit-application
                    ${ref(this.bRef)}
                    type="B"
                    slot="app2"
                ></lit-application>
                <lit-test-main-application
                    .aRef=${this.aRef}
                    .bRef=${this.bRef}
                    .psRef=${this.psRef}
                    .ps2Ref=${this.ps2Ref}
                    .psController=${this.controller}
                    slot="tests"
                ></lit-test-main-application>
            </main-test-layout>
            <lit-application-ps
                .onResult=${this.controller.handleResult}
                .onPing=${this.controller.handlePing}
                .onReset=${this.controller.handleReset}
                .onDisable=${this.controller.handleDisable}
                .onEnable=${this.controller.handleEnable}
                ${ref(this.psRef)}
            ></lit-application-ps>
            <lit-application-ps ${ref(this.ps2Ref)}></lit-application-ps>
        `;
    }
}
