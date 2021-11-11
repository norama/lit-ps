import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('test-case-button')
export class TestCaseButton extends LitElement {
    @property()
    type: 'application' | 'state' | 'all' = 'application';

    static styles = css`
        button {
            width: 100px;
            height: 50px;
            cursor: pointer;

            font-size: 18px;
            font-weight: 600;
            border-radius: 16px;

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

    colors = {
        application: 'blue',
        state: '#e95422',
        all: 'purple',
    };

    backgroundColors = {
        application: 'lightblue',
        state: '#feeaa5',
        all: '#edb3f2',
    };

    render() {
        const styles = {
            color: this.colors[this.type],
            backgroundColor: this.backgroundColors[this.type],
        };

        return html`
            <button ?disabled=${this.disabled} style=${styleMap(styles)}>
                <slot></slot>
            </button>
        `;
    }
}
