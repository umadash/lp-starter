import { EventDispatcher } from './../events/EventDispatcher';
import { Easing } from './Easing'

export class Tween extends EventDispatcher {

  constructor(target:any, to:object, from:object = null, duration:number = 1000, easing:any = Easing.linear, onStart:any = null, onUpdate:any = null, onComplete:any = null) {
    super();

    this.target = target;
    this.to = to;
    this.from = from;
    this.duration = duration;
    this.easing = easing;

    this.progressRate = 0;
    this.progressTime = 0;

    this.timer = 0;
    this.onStart  = onStart;
    this.onUpdate = onUpdate;

    if (onComplete) {
      this.onComplete = onComplete;
    }
    else {
      if (onUpdate) this.onComplete = onUpdate;
    }
  }

  /**
   * 開始
   */
  public start():void {
    // すでに開始されていたらストップ
    this.stop();

    // 開始時間
    this.startTime = Date.now();

    // オブジェクト更新要素
    const keys = Object.keys(this.to);
    const nKeys = keys.length;

    // スタート時の値の保存
    this.begin = this.from;
    if (!this.from) {
      this.begin = {};
      for (let i = 0; i < nKeys; i += 1) {
        const key = keys[i];
        this.begin[key] = this.target[key];
      }
    }
    else {
      this.begin = $.extend(true, {}, this.from);
    }

    // スタート
    if (this.onStart) this.onStart();

    const update:any = () => {
      // 経過時間
      const past = Date.now() - this.startTime;

      // 進行度
      const rate = past / this.duration;
      this.progressTime = rate * this.duration;
      this.progressRate = rate;

      // 途中か完了か
      const isComplete = !(rate < 1);

      if (isComplete) {
        for (let i = 0; i < nKeys; i += 1) {
          const key = keys[i];
          this.target[key] = this.to[key];
        }

        // アニメーションストップ
        this.stop();
        if (this.onUpdate) this.onUpdate();
        if (this.onComplete) this.onComplete();
      }
      else {
        const t = past * .001;
        const d = this.duration * .001;

        for (let i = 0; i < nKeys; i += 1) {
          const key = keys[i];
          const b = this.begin[key];
          const c = this.to[key] - b;
          const value = this.easing(t, b, c, d);
          this.target[key] = value;
        }
      }

      // コールバックが設定されていなければイベントを発信
      if (this.onUpdate) {
        this.onUpdate(this.target);
      }
    };

    this.timer = setInterval(update, 1000 / 60);
  }

  public stop():void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public getIsComplete():boolean {
    return (this.progressRate >= 1);
  }

  /**
   * キャンセル
   */
  public cancel():void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private target:any;
  private to:any;
  private from:any;
  private duration:number;
  private easing:any;
  private onStart:any;
  private onUpdate:any;
  private onComplete:any;

  private begin:any;
  private startTime:number;
  private timer:number;
  private progressRate:number;
  private progressTime:number;
}
