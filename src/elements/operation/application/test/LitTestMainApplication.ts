import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref, Ref } from 'lit/directives/ref.js';
import { repeat } from 'lit/directives/repeat.js';

import { MainTestApplicationController } from '../../control/test/MainTestApplicationController';
import { LitApplicationPS } from '../../ps/LitApplicationPS';
import { LitApplication } from '../LitApplication';
import {
    applicationPSTestCases,
    IApplicationPSContext,
} from './applicationPSTestCases';
import { ApplicationTestCase } from './ApplicationTestCase';
import { LitTestCase } from './LitTestCase';
import {
    IMainApplicationContext,
    mainApplicationTestCases,
} from './mainApplicationTestCases';

@customElement('lit-test-main-application')
export class LitTestMainApplication extends LitElement {
    @property({ type: Object })
    aRef?: Ref<LitApplication> = undefined;

    @property({ type: Object })
    bRef?: Ref<LitApplication> = undefined;

    @property({ type: Object })
    psRef?: Ref<LitApplicationPS> = undefined;

    @property({ type: Object })
    ps2Ref?: Ref<LitApplicationPS> = undefined;

    @property({ type: Object })
    psController?: MainTestApplicationController = undefined;

    @state()
    inProgress = false;

    @state()
    runningTestCaseIndex?: number = undefined;

    @state()
    score = 0;

    stop = false;

    testCases?: ApplicationTestCase<any>[] = undefined;

    runningTestCase = () =>
        this.runningTestCaseIndex !== undefined && this.testCases
            ? this.testCases[this.runningTestCaseIndex]
            : undefined;

    runningTestCaseType = () => {
        const testCase = this.runningTestCase();
        return testCase ? testCase.type : 'all';
    };

    testCaseRefs: Ref<LitTestCase>[] = [
        ...applicationPSTestCases,
        ...mainApplicationTestCases,
    ].map((_t) => createRef<LitTestCase>());

    createApplicationPSTests() {
        if (this.psRef?.value && this.ps2Ref?.value && this.psController) {
            const context = {
                ps: this.psRef?.value,
                ps2: this.ps2Ref?.value,
                controller: this.psController,
            };

            const beforeTest = () => {
                context.ps.reset();
                context.ps2.reset();
            };

            return applicationPSTestCases.map(
                (testCase) =>
                    new ApplicationTestCase<IApplicationPSContext>(
                        testCase,
                        'state',
                        context,
                        beforeTest
                    )
            );
        } else {
            return [];
        }
    }

    createMainApplicationTests() {
        if (this.aRef?.value && this.bRef?.value) {
            const context = {
                a: this.aRef?.value,
                b: this.bRef?.value,
            };

            const beforeTest = () => {
                context.a.controller.psRef.value?.reset();
                context.b.controller.psRef.value?.reset();
            };

            return mainApplicationTestCases.map(
                (testCase) =>
                    new ApplicationTestCase<IMainApplicationContext>(
                        testCase,
                        'application',
                        context,
                        beforeTest
                    )
            );
        } else {
            return [];
        }
    }

    createTests() {
        return [
            ...this.createApplicationPSTests(),
            ...this.createMainApplicationTests(),
        ];
    }

    handleStop = () => {
        this.stop = true;
    };

    handleTestStarted = () => {
        this.inProgress = true;
        this.stop = false;
        this.score = 0;
        this.runningTestCaseIndex = undefined;
    };

    handleTestFinished = () => {
        this.inProgress = false;
        this.stop = false;
    };

    handleRunAll = async () => {
        this.handleTestStarted();
        this.testCaseRefs.forEach((ltc) => {
            ltc.value?.reset();
        });
        this.requestUpdate();
        for (let i = 0; i < this.testCaseRefs.length; ++i) {
            if (this.stop) {
                break;
            }
            this.runningTestCaseIndex = i;
            const ltc = this.testCaseRefs[i];
            const result = await ltc.value?.runTest();
            if (result) {
                this.score++;
            }
        }
        this.handleTestFinished();
    };

    render() {
        if (!this.testCases) {
            this.testCases = this.createTests();

            if (!this.testCases) {
                return null;
            }
        }

        const progress =
            this.runningTestCaseIndex !== undefined
                ? (this.runningTestCaseIndex + 1) / this.testCases?.length
                : 0;

        return html`
            <test-layout>
                ${repeat(
                    this.testCases,
                    (_testCase: ITestCase, index: number) => index,
                    (testCase: ITestCase, index: number) => html`
                        <lit-test-case
                            .testCase=${testCase}
                            .index=${index}
                            .disabled=${this.inProgress}
                            .onStarted=${this.handleTestStarted}
                            .onFinished=${this.handleTestFinished}
                            ${ref(this.testCaseRefs[index])}
                        ></lit-test-case>
                    `
                )}
            </test-layout>
            <test-case-layout>
                <test-case-number
                    .type=${this.runningTestCaseType()}
                    slot="number"
                >
                    ${this.runningTestCaseIndex !== undefined
                        ? `${this.runningTestCaseIndex + 1}.`
                        : ''}
                </test-case-number>
                <progress-bar
                    .value=${progress}
                    .background=${this.runningTestCaseIndex !== undefined
                        ? '#edb3f2'
                        : 'transparent'}
                    .color=${'purple'}
                    slot="description"
                ></progress-bar>
                <test-case-button
                    .type=${'all'}
                    @click=${this.inProgress
                        ? this.handleStop
                        : this.handleRunAll}
                    slot="run"
                >
                    ${this.inProgress ? 'Stop' : 'Run All'}
                </test-case-button>
                <score-display slot="result">
                    ${this.runningTestCaseIndex !== undefined ? this.score : ''}
                </score-display>
            </test-case-layout>
        `;
    }
}
