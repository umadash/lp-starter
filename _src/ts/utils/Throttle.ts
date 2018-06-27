export class Throttle {

    private interval: number;
    private callback: () => {};
    private timer: any = null;
    private lastExecuteTime: number = null;

    constructor(interval: number, callback: () => {}) {
        this.interval = interval;
        this.callback = callback;
    }
    
    public execute(now: number):void {
        if (this.lastExecuteTime != null && this.interval > now - this.lastExecuteTime) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.timer = null;
                this.lastExecuteTime = now;
                this.callback();
            }, this.interval);
        }
        else {
            this.lastExecuteTime = now;
            this.callback();
        }
    }

    public cancel(): void {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.lastExecuteTime = null;
    }

}