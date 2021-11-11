import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('action-button')
export class ActionButton extends LitElement {
    static styles = css`
        button {
            width: 120px;
            height: 50px;
            cursor: pointer;

            color: black;
            font-size: 18px;
            font-weight: 600;
            border-radius: 8px;

            opacity: 0.8;
        }

        button:hover {
            opacity: 1;
        }

        button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }

        button:disabled:hover {
            opacity: 0.6;
        }

        ::slotted(*) {
            width: fit-content;
        }
    `;

    @property({ type: Boolean })
    disabled = false;

    render() {
        return html`
            <center-layout>
                <button ?disabled=${this.disabled}><slot></slot></button>
            </center-layout>
        `;
    }
}
