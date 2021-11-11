import { css, html, LitElement } from 'lit';

const PS = window.PS;

export class SampleButtonElement extends LitElement {
    static styles = css`
        button {
            width: 100px;
            height: 50px;
            opacity: 0.8;
        }

        button:hover {
            opacity: 1;
            cursor: pointer;
        }
    `;

    render() {
        return html` <button @click="${this._action}">LIT Button</button> `;
    }

    _action() {
        PS.publishState('LIT state', 'lit');
    }
}
