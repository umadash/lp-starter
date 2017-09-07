import Command from './Command';

/**
 * 引数のコールバック内で必ずcomplete()メソッドを叩いてください
 */
export default class Func extends Command {
  constructor(callback) {
    super();
    this.callback = callback;
  }

  execute() {
    this.callback(this);
  }
}
