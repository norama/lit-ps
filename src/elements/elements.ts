import { AppDrawLayout } from './design/layout/AppDrawLayout.js';
import { AppLayout } from './design/layout/AppLayout.js';
import {
    CenterLayout,
    ColumnLayout,
    MainLayout,
    RowLayout,
    RowLayoutBetween,
} from './design/layout/MainLayout.js';
import { MainTestLayout } from './design/layout/test/MainTestLayout.js';
import { TestCaseLayout } from './design/layout/test/TestCaseLayout.js';
import { TestLayout } from './design/layout/test/TestLayout.js';
import { ActionButton } from './design/widget/ActionButton.js';
import { BlinkContent } from './design/widget/BlinkContent';
import { DrawResult } from './design/widget/DrawResult';
import { LitLabel } from './design/widget/LitLabel.js';
import { MaxCountInput } from './design/widget/MaxCountInput';
import { ProgressBar } from './design/widget/ProgressBar';
import { ResultDisplay } from './design/widget/ResultDisplay';
import { SampleButtonElement } from './design/widget/SampleButtonElement.js';
import { ScoreDisplay } from './design/widget/ScoreDisplay';
import { TestCaseButton } from './design/widget/test/TestCaseButton';
import { TestCaseDescription } from './design/widget/test/TestCaseDescription';
import { TestCaseNumber } from './design/widget/test/TestCaseNumber';
import { TestCaseResult } from './design/widget/test/TestCaseResult';
import { TypeSelector } from './design/widget/TypeSelector.js';
import { LitApplication } from './operation/application/LitApplication.js';
import { LitDrawApplication } from './operation/application/LitDrawApplication.js';
import { MainApplication } from './operation/application/MainApplication.js';
import { LitTestCase } from './operation/application/test/LitTestCase';
import { LitTestMainApplication } from './operation/application/test/LitTestMainApplication.js';
import { MainTestApplication } from './operation/application/test/MainTestApplication.js';
import { LitApplicationPS } from './operation/ps/LitApplicationPS.js';
import { LitDrawApplicationPS } from './operation/ps/LitDrawApplicationPS.js';

export {
    AppLayout,
    AppDrawLayout,
    CenterLayout,
    ColumnLayout,
    MainLayout,
    RowLayout,
    MainTestLayout,
    TestLayout,
    TestCaseLayout,
    RowLayoutBetween,
    ActionButton,
    DrawResult,
    BlinkContent,
    LitApplication,
    LitTestMainApplication,
    LitDrawApplication,
    MainApplication,
    MainTestApplication,
    ScoreDisplay,
    ResultDisplay,
    TypeSelector,
    ProgressBar,
    MaxCountInput,
    LitLabel,
    LitApplicationPS,
    LitDrawApplicationPS,
    TestCaseDescription,
    TestCaseResult,
    TestCaseButton,
    TestCaseNumber,
    LitTestCase,
};

customElements.define('sample-button-element', SampleButtonElement);
