import { Command } from "./Command";

export class Wait extends Command {

  constructor(sec: number) {
    super();

    this.sec = sec;
  }

  public execute(): void {
    this.timer = setTimeout(() => {
      this.complete();
    }, this.sec * 1000);
  }

  public interrupt(): void {
    clearTimeout(this.timer);
  }

  public complete() {
    super.complete();
  }

  private sec: number;
  private timer: any;
}
