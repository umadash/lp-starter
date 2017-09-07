import Command from './Command';
import Event from '../events/Event';

export default class Wait extends Command {
  constructor(sec) {
    super();

    this.sec = sec;
  }

  execute() {
    const self = this;
    setTimeout(() => {
      self.dispatchEvent(new Event('complete'));
    }, this.sec * 1000);
  }
}
