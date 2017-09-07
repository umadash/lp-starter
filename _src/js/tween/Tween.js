import EventDispatcher from '../events/EventDispatcher'
import Event from '../events/Event'

export default class Tween extends EventDispatcher {

  constructor(startValue, endValue, duration, easing, callback = null) {
    super();

    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.easing = easing;
    this.callback = callback;

    this.progressRate = 0;
    this.progressTime = 0;
    this.progressValue = 0;
  }

  /**
   * 開始
   */
  start() {
    // すでに開始されていたらストップ
    this.stop();

    // 差
    const diff = this.endValue - this.startValue;

    // 開始時間
    const startTime = Date.now();


    const self = this;
    const update = () => {
      self.request = requestAnimationFrame(update);

      // 経過時間
      const past = Date.now() - startTime;

      // 進行度
      const t = past / self.duration;
      self.progressTime = t * self.duration;
      self.progressRate = t;

      // 途中か完了か
      const isProgress = (t < 1);

      if (isProgress) {
        self.progressValue = self.easing(t, self.startValue, diff, self.duration / 1000);
      }
      else {
        self.stop();
        self.progressValue = self.endValue;
      }

      // コールバックが設定されていなければイベントを発信
      if (self.callback) {
        self.callback(self.progressValue, !isProgress);
      }
      else {
        const event = (isProgress) ? new Event('progress') : new Event('complete');
        event.data = {
          value: self.progressValue
        };
        self.dispatchEvent(event);
      }
    };
    update();
  }

  stop() {
    if (this.request) {
      cancelAnimationFrame(this.request);
      this.request = null;
    }
  }

  /**
   * キャンセル
   */
  cancel() {
  }
}
