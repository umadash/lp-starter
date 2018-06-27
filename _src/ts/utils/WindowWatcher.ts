import { Event } from './../events/Event';
import { Throttle } from './Throttle';

export class WindowWatcher {

    private static startWatching(eventName: string, handler: any, handlers: Object, id: string = '', throttle: number = 0, execute: boolean = true): void {
        const $watcher: JQuery = WindowWatcher.$watcher;

        if (Object.keys(handlers).length < 1) {
            $watcher.on(eventName, () => {
                const now: number = Date.now();
                Object.keys(handlers).forEach((key) => {
                    const t: Throttle = handlers[key];
                    t.execute(now);
                });
            });
        }

        handlers[id] = new Throttle(throttle, handler);
        if (execute) handler();
    }

    private static stopWatching(eventName: string, handlers: Object, id: string = null): void {
        if (id) {
            delete handlers[id];
        }
        else {
            this.$watcher.off(eventName);
        }
    }

    /**
     * Scroll
     */
    public static startWatchingScroll(handler: any, id: string = '', throttle: number = 0, execute: boolean = true): void {
        this.startWatching(Event.Scroll, handler, this.scrollHandlers, id, throttle, execute);
    }

    public static stopWatchingScroll(id: string = null): void {
        this.stopWatching(Event.Scroll, this.scrollHandlers, id);
    }

    /**
     * Resize
     */
    public static startWatchingResize(handler: any, id: string = '', throttle: number = 0, execute: boolean = true): void {
        this.startWatching(Event.Resize, handler, () => {
            const windowWidth: number = window.innerWidth;
            if (windowWidth != this.windowWidth) {
                handler();
                this.windowWidth = windowWidth;
            }
        }, id, throttle, execute);
    }

    public static stopWatchingResize(id: string = null): void {
        this.stopWatching(Event.Resize, this.resizeHandlers, id);
    }

    /**
     * Focus
     */
    public static startWatchingFocus(handler: any, execute: boolean = true): void {
        WindowWatcher.$watcher.focus(handler);
        if (execute) handler();
    }

    /**
     * Blur
     */
    public static startWatchingBlur(handler: any, execute: boolean = true): void {
        WindowWatcher.$watcher.blur(handler);
        if (execute) handler();
    }

    /**
     * Util
     */
    public static getScrollTop(): number {
        return WindowWatcher.$watcher.scrollTop();
    }

    public static $watcher: JQuery = $(window);
    private static scrollHandlers: Object = {};
    private static resizeHandlers: Object = {};
    private static windowWidth: number = -9999;

    constructor() {
        console.warn('Cant create instance');
    }
}
