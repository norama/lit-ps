import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('test-layout')
export class TestLayout extends LitElement {
    static styles = css`
        div.outer {
            max-height: 80vh;
            display: flex;
            flex-direction: column;
            padding-bottom: 20px;
            border-bottom: 2px solid rgba(155, 155, 155, 0.5);
        }

        div.inner {
            flex-grow: 1;
            overflow-y: auto;
        }

        ::-webkit-scrollbar {
            width: 9px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background-color: rgba(155, 155, 155, 0.5);
            border-radius: 20px;
            border: transparent;
        }
    `;

    render() {
        return html`
            <div class="outer">
                <div class="inner">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}
