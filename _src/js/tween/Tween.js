import EventDispatcher from '../events/EventDispatcher'
import Event from '../events/Event'
require('../tween/Easing');

export default class Tween extends EventDispatcher {

  constructor(target, to, from = null, duration = 1000, easing = Easing.linear, callback = null) {
    super();

    this.target = target;
    this.to = to;
    this.from = from;
    this.duration = duration;
    this.easing = easing;
    this.callback = callback;

    this.progressRate = 0;
    this.progressTime = 0;
  }

  /**
   * 開始
   */
  start() {
    // すでに開始されていたらストップ
    this.stop();

    // 開始時間
    this.startTime = Date.now();

    // オブジェクト更新要素
    const keys = Object.keys(this.to);
    const nKeys = keys.length;

    // スタート時の値の保存
    this.begin = this.from;
    if (!this.begin) {
      this.begin = {};
      for (let i = 0; i < nKeys; i += 1) {
        const key = keys[i];
        this.begin[key] = this.target[key];
      }
    }

    const self = this;
    const update = () => {
      // 経過時間
      const past = Date.now() - self.startTime;

      // 進行度
      const rate = past / self.duration;
      self.progressTime = rate * self.duration;
      self.progressRate = rate;

      // 途中か完了か
      const isComplete = !(rate < 1);
      const t = past * .001;
      const d = self.duration * .001;

      for (let i = 0; i < nKeys; i += 1) {
        const key = keys[i];

        if (isComplete) {
          self.target[key] = self.to[key];
        }
        else {
          const b = self.begin[key];
          const c = self.to[key] - b;
          self.target[key] = self.easing(t, b, c, d);
        }
      }

      if (isComplete) {
        self.stop();
      }

      // コールバックが設定されていなければイベントを発信
      if (self.callback) {
        self.callback(isComplete);
      }
      else {
        const event = new Event('update');
        self.dispatchEvent(event);
      }
    };
    this.timer = setInterval(update, 1000 / 60);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.request = null;
    }
  }

  /**
   * キャンセル
   */
  cancel() {
  }
}
