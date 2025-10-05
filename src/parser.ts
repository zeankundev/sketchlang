import { CanvasRenderingContext2D } from "skia-canvas";
import { Command, CommandMap } from "./types.js";

import { goto } from "./commands/goto.js";
import { setfill } from "./commands/setfill.js";
import { startpath } from "./commands/startpath.js";

class Parser {
    private ctx: CanvasRenderingContext2D;
    private commands: CommandMap;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.commands = {
            goto,
            setfill,
            startpath
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