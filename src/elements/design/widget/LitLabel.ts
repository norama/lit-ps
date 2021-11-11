import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { log } from '../../util/log';

@customElement('lit-label')
export class LitLabel extends LitElement {
    static styles = css`
        :host {
            font-size: 40px;
            font-weight: 700;
            color: blue;
        }
    `;

    render() {
        log('RENDER', 'LitLabel');

        return html` <slot></slot> `;
    }
}
