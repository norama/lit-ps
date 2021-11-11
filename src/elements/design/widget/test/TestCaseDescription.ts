import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('test-case-description')
export class TestCaseDescription extends LitElement {
    static styles = css`
        div {
            padding: 10px;
            color: white;
            width: 180px;
            margin-left: -60px;
        }
    `;

    render() {
        return html` <div><slot></slot></div> `;
    }
}
