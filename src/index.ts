import fs from 'fs';
import path from 'path';
import { Canvas, Window } from 'skia-canvas';
import lexer from './lexer';
import Parser from './parser';

const showHelp = (): void => {
    console.log(`Usage: sketchlang <file.sk> [flags] [output_file]
    Flags:
        -h, --help      Show this help message
        -w, --window    Open a window to display the output
    NOTE: To change the canvas width or height, use the $CANVASSIZE command in your .sk file.
    NOTE: Example: $CANVASSIZE 800 600
    Example:
        sketchlang examples/random.sk -w output.png
        sketchlang examples/random.sk --window --width 800 --height 600
    `);

}

const main = async (): Promise<void> => {
    let isWindowMode: boolean = false;
    const args: string[] = process.argv.slice(2);
    if (args.length < 1) {
        showHelp();
        process.exit(1);
    }
    if (args.includes('-h') || args.includes('--help')) {
        showHelp();
        process.exit(0);
    }
    if (args.includes('-w') || args.includes('--window')) {
        isWindowMode = true;
    }
    
    const inputFile = args[0];
    const outputFile = args.find(arg => !arg.startsWith('-') && arg !== inputFile) || 'output.png';
    if (!fs.existsSync(inputFile)) {
        console.error(`Module not found: ${inputFile}`);
        process.exit(1);
    }
    let code: string;
    try {
        code = fs.readFileSync(inputFile, 'utf-8');
    } catch (e) {
        console.error(`Failed to read file: ${inputFile}`);
        if (e instanceof Error) {
            console.error(e.message);
        }
        process.exit(1);
    }
    let width: number = 600;
    let height: number = 400;
    let processedCode = code;

    const canvasSizeRegex = /^\$CANVASSIZE\s+(\d+)\s+(\d+)$/m;
    const match = code.match(canvasSizeRegex);
    if (match && match[1] && match[2]) {
        width = parseInt(match[1], 10);
        height = parseInt(match[2], 10);
        processedCode = code.replace(canvasSizeRegex, '').trim();
    } else {
        console.log('No $CANVASSIZE found, but still interpreting...');
    }

    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    try {
        console.log('Interpreting script, please wait...');
        const tokens = lexer(processedCode);
        const parser = new Parser(ctx);
        await parser.execute(tokens);
        if (isWindowMode) {
            const window = new Window(width, height);
            window.title = 'Sketchlang Window';
            window.on('draw', (e) => {
                e.target.canvas.getContext('2d').drawImage(canvas, 0, 0);
            })
        }
        const buffer = await canvas.toBuffer('png');
        fs.writeFileSync(outputFile, buffer);
        console.log(`Output written to ${outputFile}`);
    } catch (e) {
        console.error('Error during interpretation:');
        if (e instanceof Error) {
            console.error(e.message);
        }
        process.exit(1);
    }
}

main();