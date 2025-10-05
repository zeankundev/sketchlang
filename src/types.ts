import { CanvasRenderingContext2D } from "skia-canvas";

export type Command = (ctx: CanvasRenderingContext2D, args: string[]) => void | Promise<void>;

export interface CommandMap {
    [key: string]: Command;
}