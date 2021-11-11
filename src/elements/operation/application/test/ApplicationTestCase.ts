export class ApplicationTestCase<C> implements ITestCase {
    testCase: IApplicationTestCase<C>;

    type: TTestCaseType = 'application';

    context: C;

    beforeTest: () => void;

    constructor(
        testCase: IApplicationTestCase<C>,
        type: TTestCaseType,
        context: C,
        beforeTest = () => {}
    ) {
        this.testCase = testCase;
        this.type = type;
        this.context = context;
        this.beforeTest = beforeTest;
    }

    get description() {
        return this.testCase.description;
    }

    test() {
        this.beforeTest();
        return this.testCase.test(this.context);
    }
}
