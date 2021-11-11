import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { asyncReplace } from 'lit/directives/async-replace.js';

import { config } from '../../config';
import { log } from '../../util/log';

@customElement('blink-content')
export class BlinkContent extends LitElement {
    render() {
        const generateDelay = async function* delay(content: TemplateResult) {
            yield html``;
            await new Promise(r => setTimeout(r, config.timeout.blink));
            yield content;
        };

        log('RENDER', 'BlinkContent');

        return html` ${asyncReplace(generateDelay(html`<slot></slot>`))} `;
    }
}
