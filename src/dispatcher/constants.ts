export const M = {
    STATE: 'STATE',
    REQUEST: 'REQUEST',
    CANCEL: 'CANCEL',
    PING: 'PING',
    BROADCAST: 'BROADCAST',
};

export const S = {
    STARTED: 'STARTED',
    ENDED: 'ENDED',
};

export const T = {
    DRAW: 'DRAW',
    RESET: 'RESET',
    DISABLE: 'DISABLE',
    ENABLE: 'ENABLE',
};

export const dot = (...args: (string | undefined)[]) =>
    args.filter(arg => arg !== undefined).join('.');

export const undot = (arg: string) => arg.split('.');

export const shift = (arg: string) => dot(...undot(arg).slice(1));
