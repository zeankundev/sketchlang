import { CanvasRenderingContext2D } from "skia-canvas";
import { Command, CommandMap } from "./types.js";

import { goto } from "./commands/goto.js";

class Parser {
    private ctx: CanvasRenderingContext2D;
    private commands: CommandMap;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.commands = {
            goto,
        }
    }

    public async execute(tokenizedLines: string[][]): Promise<void> {
        for (const tokens of tokenizedLines) {
            if (tokens.length === 0) continue;

            const [commandName, ...args] = tokens;
            const command = this.commands[commandName.toLowerCase()];

            if (command) {
                await command(this.ctx, tokens);
            } else {
                throw new ReferenceError(`Unknown command: ${commandName}`);
            }
        }
    }
}
export = Parser;