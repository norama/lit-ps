export const log = (type: string, message: string, s: any = '') => {
    if ((window as any).dispatcherLog)
        console.log(`-- DISPATCHER : ${type} -- ${message}`, s);
};

export const logPublish = (message: string, s: any) => {
    log('PUBLISH', message, s);
};

export const logSubscribe = (message: string, s: any) => {
    log('SUBSCRIBE', message, s);
};

export const logSubscribeOnce = (message: string, s: any) => {
    log('SUBSCRIBE ONCE', message, s);
};

export const logCancel = () => {
    log('CANCEL', 'REQUEST');
};
