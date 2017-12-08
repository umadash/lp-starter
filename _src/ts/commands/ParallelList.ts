import { Command } from "./Command";

export class ParallelList extends Command {
  constructor(commands: Command[]) {
    super();

    this.commands = commands;
  }

  public execute():void {
    const length = this.commands.length;
    for (let i = 0; i < length; i += 1) {
      const command = this.commands[i];
      command.execute();
    }

    this.notifyComplete();
  }

  public add(command):void {
    this.commands.push(command);
  }

  public interrupt():void {
    const length = this.commands.length;
    for (let i = 0; i < length; i += 1) {
      const command = this.commands[i];
      command.interrupt();
    }
  }

  private commands: Command[];
}
