export class Logger {

    public static log(... messages: any[]): void {
        if (Logger.enable) console.log(messages);
    }

    public static warn(... messages: any[]): void {
        if (Logger.enable) console.warn(messages);
    }

    public static info(message?: any): void {
        if (Logger.enable) console.info(message);
    }

    public static error(message?: any): void {
        if (Logger.enable) console.error(message);
    }

    public static enable: boolean = true;
}