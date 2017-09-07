import Command from './Command';
import Event from '../events/Event'

export default class SerialList extends Command {
  constructor(commands, repeat = 0) {
    super();
    this.commands = commands;
    this.repeat = repeat;

    this.currentIndex = -1;
    this.currentCommand = null;
    this.count = 0;
    this.flgCancel = false;
  }

  getIsComplete() {
    return (this.count === this.commands.length);
  }

  execute() {
    this.flgCancel = false;
    this.next();
  }

  add(command) {
    this.commands.push(command);
  }

  next() {
    const nextIndex = this.currentIndex + 1;
    if (nextIndex < this.commands.length) {
      const self = this;
      const nextCommand = this.commands[nextIndex];
      nextCommand.addEventListener('complete', () => {
        if (self.flgCancel) return;
        self.next();
      });
      this.currentIndex = nextIndex;
      this.currentCommand = nextCommand;

      nextCommand.execute();
    }
    else {
      if (this.count < this.repeat) {
        this.count += 1;
        this.currentIndex = -1;
        this.next();
      }
      else {
        this.dispatchEvent(new Event('complete'));
      }
    }
  }

  /**
   * 現在実行されているコマンドから先へは進まないようにする
   */
  cancel() {
    this.flgCancel = true;
  }
}
