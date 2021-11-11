import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { centeredStyles } from './layout-styles';

const hostStyles = css`
    .root {
        width: 90%;
        height: 90%;

        padding: 20px;
        background-color: lightblue;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .first-row {
        width: 100%;
        height: 33%;
    }

    .second-row {
        width: 100%;
        margin: 20px 0;
    }

    .third-row {
        width: 100%;
        height: 16%;
    }

    .res {
        min-width: 160px;
        width: 160px;
    }

    ::slotted(*) {
        border: 2px solid transparent;
    }
`;

@customElement('app-layout')
export class AppLayout extends LitElement {
    static styles = [hostStyles, centeredStyles];

    render() {
        return html`
            <column-layout class="root">
                <div class="first-row">
                    <row-layout-between>
                        <center-layout>
                            <slot name="label"></slot>
                        </center-layout>
                        <div class="res">
                            <center-layout>
                                <slot name="score"></slot>
                            </center-layout>
                        </div>
                    </row-layout-between>
                </div>

                <div class="second-row">
                    <row-layout-between>
                        <center-layout>
                            <slot name="type-selector"> </slot>
                        </center-layout>
                        <div class="res">
                            <center-layout>
                                <slot name="result"></slot>
                            </center-layout>
                        </div>
                    </row-layout-between>
                </div>

                <div class="third-row">
                    <slot name="action-buttons"></slot>
                </div>
            </column-layout>
        `;
    }
}
