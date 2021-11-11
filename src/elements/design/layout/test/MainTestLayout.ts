import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { centeredStyles, hostStyles, paddedHostStyles } from '../layout-styles';

@customElement('main-test-layout')
export class MainTestLayout extends LitElement {
    static styles = [hostStyles, centeredStyles, paddedHostStyles];

    render() {
        return html`
            <row-layout>
                <column-layout>
                    <slot name="app1"></slot>
                    <col-gap .size=${30}></col-gap>
                    <slot name="app2"></slot>
                </column-layout>
                <column-layout>
                    <slot name="tests"></slot>
                </column-layout>
            </row-layout>
        `;
    }
}
