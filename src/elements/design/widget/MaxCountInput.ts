import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { log } from '../../util/log';

@customElement('max-count-input')
export class MaxCountInput extends LitElement {
    static styles = css`
        :host {
            color: beige;
            font-size: 12px;
            font-weight: 400;
        }

        .wrapper {
            transform: scale(1.5);
        }

        .label {
            margin-bottom: 5px;
        }

        input[type='number'] {
            background: beige;
            cursor: pointer;
        }
        input[type='number']:disabled {
            cursor: not-allowed;
        }
    `;

    @property()
    onMaxCountChange = (maxCount: number) => {};

    @property({ type: Number })
    value = 10;

    @property({ type: Boolean })
    disabled = false;

    handleChange = (e: any) => {
        this.onMaxCountChange(parseInt(e.target.value));
    };

    render() {
        log('RENDER', 'MaxCountInput');
        return html`
            <center-layout>
                <div class="wrapper">
                    <div class="label">Number of draws:</div>
                    <input
                        type="number"
                        name="count"
                        value=${this.value}
                        min=${1}
                        step=${1}
                        @change=${this.handleChange}
                        ?disabled=${this.disabled}
                    />
                </div>
            </center-layout>
        `;
    }
}
