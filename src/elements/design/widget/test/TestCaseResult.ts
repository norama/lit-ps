import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('test-case-result')
export class TestCaseResult extends LitElement {
    @property({ type: Boolean })
    result: boolean | undefined = undefined;

    render() {
        return html` <draw-result
            .size=${60}
            .color=${this.result ? 'green' : 'red'}
        >
            ${this.result ? '✓' : this.result === false ? 'X' : ''}
        </draw-result>`;
    }
}
