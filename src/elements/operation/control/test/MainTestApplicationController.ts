import { ReactiveController, ReactiveControllerHost } from 'lit';

export class MainTestApplicationController implements ReactiveController {
    host: ReactiveControllerHost;

    callStack: string[] = [];

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this);
    }

    handleResult = (result: string) => {
        this.callStack.push(`handleResult(${result})`);
    };

    handlePing = (result: string) => {
        this.callStack.push(`handlePing(${result})`);
    };

    handleDisable = () => {
        this.callStack.push('handleDisable()');
    };

    handleEnable = () => {
        this.callStack.push('handleEnable()');
    };

    handleReset = () => {
        this.callStack = [];
    };

    hostConnected() {}

    hostDisconnected() {}
}
