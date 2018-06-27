import { ParallelList } from './../commands/ParallelList';
import { Command } from './../commands/Command';
import { SerialList } from './../commands/SerialList';
export class CommandUtil {


    public static serial(commands: Array<Command>, execute: boolean = true): SerialList{
        const serial = new SerialList(commands);
        if (execute) serial.execute();
        return serial;
    }

    public static parallel(commands: Command[], execute: boolean = true): ParallelList {
        const parallel: ParallelList = new ParallelList(commands);
        if (execute) parallel.execute();
        return parallel;
    }
    
}