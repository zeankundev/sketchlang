import { CanvasRenderingContext2D } from "skia-canvas";
import { Command, CommandMap } from "./types.js";

import { goto } from "./commands/goto";
import { setfill } from "./commands/setfill";
import { startpath } from "./commands/startpath";
import { line } from "./commands/line";
import { endpath } from "./commands/endpath";
import { fill } from "./commands/fill.js";

class Parser {
    private ctx: CanvasRenderingContext2D;
    private commands: CommandMap;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.commands = {
            goto,
            setfill,
            startpath,
            line,
            endpath,
            fill
        }
    }

    public async execute(tokenizedLines: string[][]): Promise<void> {
        for (const tokens of tokenizedLines) {
            if (tokens.length === 0) continue;

            const [commandName, ...args] = tokens;
            const command = this.commands[commandName.toLowerCase()];

            if (command) {
                const newArguments = args.shift();
                await command(this.ctx, newArguments ? [newArguments, ...args] : args);
            } else {
                throw new ReferenceError(`Unknown command: ${commandName}`);
            }
        }
    }
}
export = Parser;