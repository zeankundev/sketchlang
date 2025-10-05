import { Command } from "../types";

export const setfill: Command = (ctx, args) => {
    if (args.length !== 1) {
        throw new SyntaxError(`setfill command requires 1 argument, got ${args.length}`);
    }
    const color = args[0];
    if (!/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(color)) {
        throw new TypeError(`setfill command argument must be a valid hex color, got ${color}`);
    }
    ctx.fillStyle = color;
}