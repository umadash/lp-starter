export type EventListener = (target:EventDispatcher, data: object) => void;
export class EventDispatcher {

  // --------------------------------------------------
  //
  // CONSTRUCTOR
  //
  // --------------------------------------------------
  constructor() {
    this.listeners = {};
  }


  // --------------------------------------------------
  //
  // METHOD
  //
  // -------------------------------------------------- 
  public addEventListener(eventName: string, listener: EventListener): void {
    if (this.listeners[eventName] == null) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  public removeEventListener(eventName: string, listener: EventListener): void {
    if (listener) {
      let eventListeners = this.listeners[eventName];
      for (let i = 0, length = eventListeners.length; i < length; i += 1) {
        const l = eventListeners[i];
        if (l === listener) {
          eventListeners.splice(i, 1);
        }
      }
    }
    else {
      if (this.listeners[eventName]) {
        this.listeners[eventName] = null;
      }
    }
  }

  public dispatchEvent(eventName: string, data: any = null): void {
    let listeners = this.listeners[eventName];
    if (listeners == null) return;

    for (var i = 0, length = listeners.length; i < length; i += 1) {
      var listener = listeners[i];
      if (listener) {
        listener(this, data);
      }
    }
  }

  // --------------------------------------------------
  //
  // MEMBER
  //
  // --------------------------------------------------
  private listeners: any;
}