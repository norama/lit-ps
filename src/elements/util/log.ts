export const log = (type: string, message: string, s: any = '') => {
    if ((window as any).litLog)
        console.log(`## LIT ## ${type} -- ${message}`, s);
};
