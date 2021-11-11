import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import '@vaadin/vaadin-progress-bar/vaadin-progress-bar.js';

@customElement('progress-bar')
export class ProgressBar extends LitElement {
    @property({ type: Number })
    value = 0;

    @property()
    color = '#1676F4';

    @property()
    background = 'transparent';

    render() {
        const styles = {
            width: '150px',
            height: '10px',
            marginLeft: '-100px',
            '--lumo-contrast-10pct': this.background,
            '--lumo-primary-color': this.color,
        };

        return html`
            <vaadin-progress-bar
                value=${this.value}
                style=${styleMap(styles)}
            ></vaadin-progress-bar>
        `;
    }
}
