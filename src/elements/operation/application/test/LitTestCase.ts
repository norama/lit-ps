import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { sleep } from './util';

@customElement('lit-test-case')
export class LitTestCase extends LitElement {
    @property({ type: Object })
    testCase: ITestCase = {
        description: '',
        type: 'application',
        test: () => Promise.resolve(true),
    };

    @property({ type: Number })
    index = 0;

    @property()
    onStarted = () => {};

    @property()
    onFinished = () => {};

    @property({ type: Boolean })
    disabled = false;

    @state()
    result: boolean | string | undefined = undefined;

    reset() {
        this.result = undefined;
    }

    logResult() {
        if (typeof this.result === 'string') {
            if (this.result !== '') {
                console.log(this.result);
            }
        }
    }

    passed() {
        return this.result === '' || this.result === true;
    }

    testResult() {
        return this.result === undefined ? undefined : this.passed();
    }

    runTest = async () => {
        console.log('RUNNING TEST: ' + this.testCase.description);
        try {
            this.result = await this.testCase.test();
            this.logResult();
            console.log(`TEST ${this.passed() ? 'PASSED' : 'FAILED'}`);
        } catch (error) {
            this.result = false;
            console.log('TEST FAILED', error);
        }
        console.log('----------');
        return this.testResult();
    };

    run = async () => {
        this.result = undefined;
        this.requestUpdate();
        await sleep(500);
        this.onStarted();
        await this.runTest();
        this.onFinished();
    };

    render() {
        return html`
            <test-case-layout>
                <test-case-number .type=${this.testCase.type} slot="number">
                    ${`${this.index + 1}.`}
                </test-case-number>
                <test-case-description slot="description">
                    ${this.testCase.description}
                </test-case-description>
                <test-case-button
                    .type=${this.testCase.type}
                    @click=${!this.disabled ? this.run : undefined}
                    .disabled=${this.disabled}
                    slot="run"
                >
                    Run
                </test-case-button>
                <test-case-result
                    .result=${this.testResult()}
                    slot="result"
                ></test-case-result>
            </test-case-layout>
        `;
    }
}
