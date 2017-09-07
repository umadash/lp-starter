import EventDispatcher from '../events/EventDispatcher'
import Event from '../events/Event'

export default class Command extends EventDispatcher {
  constructor() {
    super();
  }

  execute() {
  }

  complete() {
    this.dispatchEvent(new Event('complete'));
  }
}
