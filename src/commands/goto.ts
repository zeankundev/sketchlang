import { Command } from "../types";

export const goto: Command = (ctx, args) => {
    if (args.length !== 3) {
        throw new SyntaxError(`goto command requires 2 arguments, got ${args.length}`);
    }
    const [x, y] = args.map(Number);
    if ([x, y].some(isNaN)) {
        throw new TypeError(`goto command arguments must be numbers, got ${args.join(', ')}`);
    }
    ctx.moveTo(x, y);
}