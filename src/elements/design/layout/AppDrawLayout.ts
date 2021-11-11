import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { centeredStyles } from './layout-styles';

const hostStyles = css`
    .root {
        width: 90%;
        height: 100%;

        background-color: black;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .first-row {
        width: 100%;
        height: 16%;

        display: flex;
        justify-content: flex-end;
    }

    .second-row {
        width: 100%;
        height: 80px;
        margin: 40px 0;
    }

    .third-row {
        width: 100%;
        height: 80px;
    }

    ::slotted(*) {
        border: 2px solid transparent;
    }
`;

@customElement('app-draw-layout')
export class AppDrawLayout extends LitElement {
    static styles = [hostStyles, centeredStyles];

    render() {
        return html`
            <column-layout class="root">
                <div class="first-row">
                    <slot name="count"></slot>
                </div>

                <div class="second-row">
                    <slot name="input"></slot>
                </div>

                <div class="third-row">
                    <slot name="action-buttons"></slot>
                </div>
            </column-layout>
        `;
    }
}
