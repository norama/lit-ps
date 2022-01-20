import { MainTestApplicationController } from '../../control/test/MainTestApplicationController';
import { LitApplicationPS } from '../../ps/LitApplicationPS';
import {
    check,
    checkObject,
    checkValue,
    futureObject,
    futureValue,
    sleep
} from './util';

export type IApplicationPSContext = {
    ps: LitApplicationPS;
    ps2: LitApplicationPS;
    controller: MainTestApplicationController;
};

export const applicationPSTestCases = [
    {
        description: 'Draw when IDLE',
        test: async (context: IApplicationPSContext) => {
            context.ps.draw(['A']);
            await futureObject(
                () => context.controller.callStack,
                ['handleResult(A)'],
                'CallStack'
            );
            return true;
        }
    },
    {
        description: 'Draw when DISABLED',
        test: async (context: IApplicationPSContext) => {
            context.ps.state = 'DISABLED';
            context.ps.draw(['A']);
            try {
                await futureObject(
                    () => context.controller.callStack,
                    ['handleResult(A)'],
                    'CallStack'
                );
                return 'FAILED: got result while disabled';
            } catch (e) {
                checkObject(context.controller.callStack, [], 'CallStack');
            }
            return true;
        }
    },
    {
        description: 'Draw when PING',
        test: async (context: IApplicationPSContext) => {
            context.ps.state = 'PING';
            context.ps.draw(['A']);
            await futureObject(() => context.ps.state, 'IDLE', 'CallStack');
            await futureObject(
                () => context.controller.callStack,
                ['handleResult(A)'],
                'CallStack'
            );
            return true;
        }
    },
    {
        description: 'Disable from self: remains IDLE',
        test: async (context: IApplicationPSContext) => {
            context.ps.disable();
            try {
                await futureValue(() => context.ps.state, 'DISABLED', 'State');
                return 'FAILED: disabled itself';
            } catch (e) {
                checkValue(context.ps.state, 'IDLE', 'State');
            }
            return true;
        }
    },
    {
        description: 'Disable from other: DISABLED, ENABLED after timeout',
        test: async (context: IApplicationPSContext) => {
            context.ps2.disable();
            await futureValue(() => context.ps.state, 'DISABLED', 'State');
            context.ps2.draw(['A']);
            checkObject(
                context.controller.callStack,
                ['handleResult()', 'handleDisable()'],
                'CallStack'
            );
            await futureValue(() => context.ps.state, 'PING', 'State');
            await futureObject(
                () => context.controller.callStack,
                [
                    'handleResult()',
                    'handleDisable()',
                    'handleEnable()',
                    'handlePing(A)'
                ],
                'CallStack'
            );
            await futureValue(() => context.ps.state, 'IDLE', 'State');
            return true;
        }
    }
] as IApplicationTestCase<IApplicationPSContext>[];
