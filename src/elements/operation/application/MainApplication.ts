import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('main-application')
export class MainApplication extends LitElement {
    render() {
        return html`
            <main-layout>
                <lit-application type="A" slot="11"></lit-application>
                <div slot="12"><slot></slot></div>
                <lit-application type="B" slot="21"></lit-application>
                <lit-application type="C" slot="22"></lit-application>
            </main-layout>
        `;
    }
}
