import { Event } from './../events/Event';
import { Throttle } from './Throttle';

export class AnimationFrameWatcher {

    /**
     * Resize
     */
    public static startWatching(handler: any, fps: number): void {
        const length: number = this.throttles.length;
        if (length < 1) {
            const update = () => {
                this.request = window.requestAnimationFrame(update);

                const now: number = Date.now();
                for (let i = 0; i < this.throttles.length; i += 1) {
                    const t: Throttle = this.throttles[i];
                    t.execute(now);
                }
            };
            update();
        }

        this.throttles.push(new Throttle(1000 / fps, handler));
    }

    public static stopWatching(): void {
        if (this.request) {
            window.cancelAnimationFrame(this.request);
            this.request = null;
        }
    }

    private static throttles: Throttle[] = [];
    private static request: number;

    constructor() {
        console.warn('Cant create instance');
    }
}
