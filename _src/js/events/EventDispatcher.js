import Event from './Event';

export default class EventDispatcher {

  constructor() {
    this.listener= {};
  }

  addEventListener(eventname, func) {
    if (this.listener[eventname] == null) {
      this.listener[eventname] = [];
    }
    this.listener[eventname].push(func);
  }

  removeEventListener(eventname) {
    if (this.listener[eventname]) {
      this.listener[eventname] = null;
    }
  }

  dispatchEvent(event) {
    let funcs = this.listener[event.name];
    if (funcs == null) return;

    // eventに発信者をひもづける
    event.target = this;

    for (var i = 0, length = funcs.length; i < length; i += 1) {
      var func = funcs[i];
      func(event);
    }
  }
}
