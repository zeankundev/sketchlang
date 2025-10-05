import { Command } from "../types";

export const line: Command = (ctx, args) => {
    if (args.length !== 2) {
        throw new SyntaxError(`line command requires 2 arguments, got ${args.length}`);
    }
    const [x, y] = args.map(Number);
    if ([x, y].some(isNaN)) {
        throw new TypeError(`line command arguments must be numbers, got ${args.join(', ')}`);
    }
    ctx.lineTo(x, y)
}