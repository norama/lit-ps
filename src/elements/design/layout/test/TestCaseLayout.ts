import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('test-case-layout')
export class TestCaseLayout extends LitElement {
    static styles = css`
        div {
            height: 100px;
            margin-left: -40px;
        }
    `;

    render() {
        return html`
            <div>
                <row-layout>
                    <center-layout><slot name="number"></slot></center-layout>
                    <center-layout><slot name="description"></slot></center-layout>
                    <center-layout><slot name="run"></slot></center-layout>
                    <center-layout><slot name="result"></slot></center-layout>
                </row-layout>
            </div>
        `;
    }
}
