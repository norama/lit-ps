import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { log } from '../../util/log';

@customElement('score-display')
export class ScoreDisplay extends LitElement {
    render() {
        log('RENDER', 'ScoreDisplay');
        return html`
            <column-layout>
                <draw-result
                    .size=${60}
                    .color=${'white'}
                    .background=${'black'}
                >
                    <slot></slot>
                </draw-result>
            </column-layout>
        `;
    }
}
