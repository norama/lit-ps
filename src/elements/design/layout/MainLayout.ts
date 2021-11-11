import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { centeredStyles, hostStyles, paddedHostStyles } from './layout-styles';

@customElement('row-layout')
export class RowLayout extends LitElement {
    static styles = [hostStyles, centeredStyles];

    render() {
        return html`
            <div class="centered evenly">
                <slot></slot>
            </div>
        `;
    }
}

@customElement('row-layout-between')
export class RowLayoutBetween extends LitElement {
    static styles = [hostStyles, centeredStyles];

    render() {
        return html`
            <div class="centered between">
                <slot></slot>
            </div>
        `;
    }
}

@customElement('column-layout')
export class ColumnLayout extends LitElement {
    static styles = [hostStyles, centeredStyles];

    render() {
        return html`
            <div class="centered between col">
                <slot></slot>
            </div>
        `;
    }
}

@customElement('main-layout')
export class MainLayout extends LitElement {
    static styles = [hostStyles, centeredStyles, paddedHostStyles];

    render() {
        return html`
            <column-layout>
                <row-layout>
                    <slot name="11"></slot>
                    <slot name="12"></slot>
                </row-layout>
                <col-gap .size=${30}></col-gap>
                <row-layout>
                    <slot name="21"></slot>
                    <slot name="22"></slot>
                </row-layout>
            </column-layout>
        `;
    }
}

@customElement('center-layout')
export class CenterLayout extends LitElement {
    static styles = css`
        .fit-content {
            width: fit-content;
            height: fit-content;
        }
    `;

    render() {
        return html`
            <row-layout>
                <div class="fit-content">
                    <slot></slot>
                </div>
            </row-layout>
        `;
    }
}

@customElement('col-gap')
export class ColGap extends LitElement {
    @property({ type: Number })
    size = 0;

    render() {
        const styles = {
            marginTop: `${this.size}px`
        };

        return html` <div style=${styleMap(styles)}></div> `;
    }
}
