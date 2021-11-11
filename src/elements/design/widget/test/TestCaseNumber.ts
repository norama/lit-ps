import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('test-case-number')
export class TestCaseNumber extends LitElement {
    @property()
    type = 'application';

    static styles = css`
        div {
            width: 50px;

            font-size: 24px;
            font-weight: 600;
        }
    `;

    render() {
        const styles = {
            color: this.type === 'application' ? 'blue' : '#e95422',
        };

        return html` <div style=${styleMap(styles)}><slot></slot></div> `;
    }
}
