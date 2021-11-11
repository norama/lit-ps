declare interface Window {
    PS: any;
    PubSub: any;
    Dispatch: any;
}

declare type TTestCaseType = 'application' | 'state';

declare interface ITestCase {
    description: string;
    type: TTestCaseType;
    test: () => Promise<boolean>;
}

declare interface IApplicationTestCase<C> {
    description: string;
    test: (context: C) => Promise<boolean>;
}
