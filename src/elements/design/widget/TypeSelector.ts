import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { log } from '../../util/log';

@customElement('type-selector')
export class TypeSelector extends LitElement {
    static styles = css`
        :host {
            color: black;
            font-size: 24px;
            font-weight: 600;
        }

        .radio {
            width: 80px;
            display: flex;
            align-items: center;
        }

        label {
            padding: 12px;
        }

        input[type='radio'] {
            cursor: pointer;
            transform: scale(2);
            margin: 0 4px 4px 0;
        }
        input[type='radio']:disabled {
            cursor: not-allowed;
        }
    `;

    @property({ type: Array })
    types: string[] = [];

    @property()
    type = '';

    @property()
    onTypeChange = (type: string) => {};

    @property({ type: Boolean })
    disabled = false;

    handleChange = (e: any) => {
        if (e.target.checked) {
            this.onTypeChange(e.target.value);
        }
    };

    render() {
        log('RENDER', 'TypeSelector');
        return html`
            <div>
                <div>Winner type:</div>

                <row-layout>
                    ${repeat(
                        this.types,
                        (value: string) => value,
                        (value: string) => html`
                            <div class="radio">
                                <input
                                    type="radio"
                                    id=${value}
                                    name="type"
                                    value=${value}
                                    @change=${this.handleChange}
                                    ?checked=${this.type === value}
                                    ?disabled=${this.disabled}
                                />
                                <label for=${value}>${value}</label>
                            </div>
                        `
                    )}
                </row-layout>
            </div>
        `;
    }
}
