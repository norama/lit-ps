export const check = (condition: boolean, message: string) => {
    if (!condition) {
        throw message;
    }
};

export const checkValue = (actual: any, expected: any, messagePrefix: string) =>
    check(
        actual === expected,
        `${messagePrefix}\nActual: ${actual}\nExpected: ${expected}`
    );

export const checkObject = (
    actual: any,
    expected: any,
    messagePrefix: string
) =>
    checkValue(JSON.stringify(actual), JSON.stringify(expected), messagePrefix);

export const future = (
    condition: () => boolean,
    message: () => string,
    maxTimeout = 10000,
    trials = 10
) =>
    new Promise((resolve, reject) => {
        const stepTimeout = Math.round(maxTimeout / trials);
        let t = 0;
        const id = setInterval(() => {
            t += stepTimeout;
            if (condition()) {
                clearInterval(id);
                resolve(true);
            } else {
                if (t > maxTimeout) {
                    clearInterval(id);
                    reject(message());
                }
            }
        }, stepTimeout);
    });

export const futureValue = (
    actual: () => any,
    expected: any,
    messagePrefix = '',
    maxTimeout = 10000,
    trials = 10
) =>
    future(
        () => actual() === expected,
        () => `${messagePrefix}\nActual: ${actual()}\nExpected: ${expected}`,
        maxTimeout,
        trials
    );

export const futureObject = (
    actual: () => any,
    expected: any,
    messagePrefix = '',
    maxTimeout = 10000,
    trials = 10
) =>
    futureValue(
        () => JSON.stringify(actual()),
        JSON.stringify(expected),
        messagePrefix,
        maxTimeout,
        trials
    );

export const sleep = (ms = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
