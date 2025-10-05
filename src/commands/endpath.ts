import { Command } from "../types";

export const endpath: Command = (ctx, args) => {
    ctx.closePath();
}