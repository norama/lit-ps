import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { log } from '../../util/log';

@customElement('draw-result')
export class DrawResult extends LitElement {
    static styles = css`
        div {
            font-weight: 800;
            border-radius: 16px;
        }
    `;

    @property({ type: Number })
    size = 150;

    @property()
    color = 'black';

    @property()
    background = 'beige';

    render() {
        const styles = {
            width: `${this.size}px`,
            height: `${this.size}px`,
            fontSize: `${this.size / 2}px`,
            color: this.color,
            background: this.background,
        };

        log('RENDER', 'DrawResult');

        return html`
            <div style=${styleMap(styles)}>
                <center-layout><slot></slot></center-layout>
            </div>
        `;
    }
}
