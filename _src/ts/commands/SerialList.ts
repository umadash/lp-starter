import { Command } from './Command';
export class SerialList extends Command {
  constructor(commands = null) {
    super();
    this.commands = commands;
    this.currentCommand = null;
    this.flgCancel = false;
  }

  public execute() {
    if (this.commands == null) return;

    this.flgCancel = false;
    this.next();
  }

  public addCommand(command) {
    if (this.commands == null) this.commands = [];
    this.commands.push(command);
  }

  public addCommands(commands) {
    if (this.commands == null) this.commands = [];
    for (let i = 0, length = commands.length; i < length; i += 1) {
      this.addCommand(commands[i]);
    }
  }

  public next() {
    if (this.commands.length > 0) {
      const nextCommand = this.commands.shift();
      const callback = () => {
        nextCommand.removeEventListener('complete', callback);
       if (this.flgCancel) return;
        this.next();
      };
      this.currentCommand = nextCommand;
      nextCommand.addEventListener('complete', callback);
      nextCommand.execute();
    }
    else {
      this.notifyComplete();
      this.currentCommand = null;
    }
  }

  public interrupt() {
    if (this.commands == null) return;

    // キャンセルフラグを立てる
    this.flgCancel = true;

    // 念のため全てのコマンドを中断
    this.interruptAllCommands();
  }

  public interruptAllCommands() {
    if (this.currentCommand) {
      this.currentCommand.interrupt();
    }

    // 残りのコマンド
    const length = this.commands.length;
    for (let i = 0; i < length; i += 1) {
      const command = this.commands[i];
      command.interrupt();
    }
  }

  private commands: Command[];
  private currentCommand: Command;
  private flgCancel: boolean;

}
