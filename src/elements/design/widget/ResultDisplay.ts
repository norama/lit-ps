import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

import { log } from '../../util/log';
import { BlinkContent } from './BlinkContent';

@customElement('result-display')
export class ResultDisplay extends LitElement {
    @property()
    color = 'black';

    blinkRef = createRef<BlinkContent>();

    public blink() {
        this.blinkRef.value?.requestUpdate();
    }

    render() {
        log('RENDER', 'ResultDisplay');
        return html`
            <column-layout>
                <draw-result
                    .size=${150}
                    .color=${this.color}
                    .background=${'beige'}
                >
                    <blink-content ${ref(this.blinkRef)}>
                        <slot></slot>
                    </blink-content>
                </draw-result>
            </column-layout>
        `;
    }
}
