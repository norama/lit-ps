import { LitApplication } from '../LitApplication';
import { check, future, sleep } from './util';

export type IMainApplicationContext = {
    a: LitApplication;
    b: LitApplication;
};

export const mainApplicationTestCases = [
    {
        description: 'Draw at A',
        test: async (context: IMainApplicationContext) => {
            const ca = context.a.controller;
            check(ca.result === '', 'result is empty');
            check(ca.score === 0, 'score is 0');
            ca.handleDraw();
            await future(
                () => ca.result === 'A' && ca.score === 1,
                () => 'result is A, score is 1'
            );
            return true;
        },
    },
    {
        description: 'Draw at B',
        test: async (context: IMainApplicationContext) => {
            const cb = context.b.controller;
            check(cb.result === '', 'result is empty');
            check(cb.score === 0, 'score is 0');
            cb.handleDraw();
            await future(
                () => cb.result === 'B' && cb.score === 1,
                () => 'result is B, score is 1'
            );
            return true;
        },
    },
    {
        description: 'Cheat',
        test: async (context: IMainApplicationContext) => {
            const cb = context.b.controller;
            check(cb.result === '', 'result is empty');
            check(cb.score === 0, 'score is 0');
            cb.handleCheat();
            check(cb.result === 'B', 'result is B');
            check(cb.score === 1, 'score is 1');
            return true;
        },
    },
    {
        description: 'Disable',
        test: async (context: IMainApplicationContext) => {
            const cb = context.b.controller;
            check(cb.result === '', 'result is empty');
            check(cb.score === 0, 'score is 0');
            cb.handleDisable();
            await future(
                () => !context.b.disabled && context.a.disabled,
                () => `b should be enabled, a and c should be disabled`
            );
            sleep(4000);
            await future(
                () => !context.b.disabled && !context.a.disabled,
                () => `all should be enabled`
            );
            return true;
        },
    },
    {
        description: 'Disable + Draw',
        test: async (context: IMainApplicationContext) => {
            const ca = context.a.controller;
            const cb = context.b.controller;
            check(cb.result === '', 'result is empty');
            check(cb.score === 0, 'score is 0');
            cb.handleDisable();
            await future(
                () => !context.b.disabled && context.a.disabled,
                () => `b should be enabled, a and c should be disabled`
            );
            cb.handleDraw();
            await future(
                () => cb.result === 'A' && ca.result === '',
                () =>
                    `b should display A, others empty : b - ${cb.result}, a - ${ca.result}`
            );
            sleep(3000);
            await future(
                () => !context.b.disabled && !context.a.disabled,
                () => `all should be enabled`
            );
            await future(
                () =>
                    cb.result === 'A' &&
                    cb.score === 0 &&
                    ca.ping === 'A' &&
                    ca.score === 0, // ping not score
                () => `b should display A, others ping A, scores 0`
            );
            return true;
        },
    },
] as IApplicationTestCase<IMainApplicationContext>[];
