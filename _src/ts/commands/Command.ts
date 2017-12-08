import { EventDispatcher } from './../events/EventDispatcher';
import { EventName } from '../vars/EventName';

export class Command extends EventDispatcher{
  constructor() {
    super();
  }

  public execute(): void {}
  public interrupt(): void {}
  public complete(): void {
    this.notifyComplete();
  }

  protected notifyComplete() {
    this.dispatchEvent(EventName.Complete);
  }
}