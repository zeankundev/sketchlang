<div align="center">
  <img width="3486" height="610" alt="image" src="https://github.com/user-attachments/assets/b027af44-663f-4fa8-83af-77b9069adbe2" />
</div>

# Sketchlang
An esoteric, made-for-fun drawing language to draw results on both window and image, made within the span of a day, using ctx2d as a proof of concept and skia-canvas for this interpreter.

# Basic syntax
You must supply the code (of course), or optionally, the canvas size by appending `$CANVASSIZE <w> <h>` at the very beginning of the file. A kind example here is to show you.
```sketchlang
$CANVASSIZE 1024 600
#           ^^^^ ^^^ You must supply these numbers. It can be up to you, as long as you follow the w x h format.
# Main program goes below
```
Here are more syntax to get you started to the programming language (from yesterday's (at the time of writing) code, more will come later):
<ul class="help-list">
                <li><code>startpath</code>: Begin a new path (ctx.beginPath()).</li>
                <li><code>endpath</code>: Close the current path (ctx.closePath()).</li>
                <li><code>goto &lt;x&gt; &lt;y&gt;</code>: Move the drawing cursor to the specified coordinates without drawing (ctx.moveTo).</li>
                <li><code>line &lt;x&gt; &lt;y&gt;</code>: Draw a line from the current position to the specified coordinates (ctx.lineTo). Call <code>stroke</code> to render the line.</li>
                <li><code>stroke</code>: Stroke the current path with the current stroke style (ctx.stroke()).</li>
                <li><code>fill</code>: Fill the current path with the current fill style (ctx.fill()).</li>
                <li><code>setfill &lt;color&gt;</code>: Set the fill color (e.g., <code>#ff0000</code>, <code>rgba(0,0,0,0.5)</code>).</li>
                <li><code>setstroke &lt;color&gt;</code>: Set the stroke color (e.g., <code>#00ff00</code>).</li>
                <li><code>setlinewidth &lt;number&gt;</code>: Set the line width in pixels (ctx.lineWidth).</li>
                <li><code>rect &lt;x&gt; &lt;y&gt; &lt;width&gt; &lt;height&gt;</code>: Draw a filled rectangle at the specified position (ctx.fillRect).</li>
                <li><code>circle &lt;x&gt; &lt;y&gt; &lt;radius&gt;</code>: Draw a filled circle centered at the given coordinates (uses ctx.arc + ctx.fill()).</li>
                <li><code>img &lt;src&gt; &lt;x&gt; &lt;y&gt; &lt;width&gt; &lt;height&gt;</code>: Draw an image from the specified URL. The <code>src</code> may be quoted; the image is loaded asynchronously and drawn on load.</li>
                <li><code>setfont &lt;family&gt; [weight] [size]</code>: Set the font used for text. Examples: <code>setfont Arial 20px</code>, <code>setfont "Times New Roman" bold 18pt</code>. Size defaults to <code>16px</code> if omitted.</li>
                <li><code>text &lt;x&gt; &lt;y&gt; &lt;text&gt;</code>: Draw the specified text at the given position. Text may contain spaces; everything after the first two arguments is treated as the text.</li>
                <li><code>stroketext &lt;x&gt; &lt;y&gt; &lt;text&gt;</code>: Stroke the specified text at the given position (ctx.strokeText).</li>
                <li><code>#</code>: Comment — start a line with <code>#</code> to ignore that entire line. Inline comments are not supported.</li>
                <li>Empty lines are ignored.</li>
                <li>Notes: coordinates and sizes are treated as canvas pixels. Many commands accept string values that the canvas API will coerce (e.g., numeric strings for positions).</li>
                <li>Do not place comments beside commands (e.g. <code>setlinewidth 2 # Changes the line width</code>: <b>BAD PRACTICE!</b>). Use it this way: (e.g. <code>setlinewidth 2</code>)</li>
            </ul>

# Building
Building? That sounds like an easy task. Just clone, `cd` into it, `yarn`, run `yarn build` and voila! You just gave birth to another Sketchlang interpreter instance on your own.
