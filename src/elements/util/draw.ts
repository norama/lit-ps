import { config } from '../config';

export const draw = (values: string[]) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            const x = Math.floor(Math.random() * values.length);
            resolve(values[x]);
        }, config.timeout.draw);
    });
