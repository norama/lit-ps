import { draw as realDraw } from './draw';
import { draw as mockDraw } from './mock/draw';

export const draw = (values: string[]) =>
    (window as any).litTest ? mockDraw(values) : realDraw(values);
