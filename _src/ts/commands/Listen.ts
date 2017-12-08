import { EventDispatcher, EventListener } from './../events/EventDispatcher';
import { Command } from "./Command";

export class Listen extends Command {

  constructor(target: EventDispatcher, eventName: string) {
    super();

    this.target = target;
    this.eventName = eventName;
 }

  public execute():void {
    this.listener = function(target, data) {
      this.target.removeEventListener(this.eventName, this.listener);
      if (this.callback) this.callback();
      this.complete();
    };
    this.target.addEventListener(this.eventName, this.listener);
  }


  public interrupt():void {
    this.target.removeEventListener(this.eventName, this.listener);
  }

  private target: EventDispatcher;
  private eventName: string;
  private listener: EventListener;
}
