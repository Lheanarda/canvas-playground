import { CanvasEl } from "@src/typings/canvas";
import { generateFontSize, getCenterXandY } from "../utils";
import Particle from "./Particle";
import { FONT_FAMILY } from "../constants";

interface Props {
  canvasEl: CanvasEl;
  text: string;
  fontFamily: string;
}
class TextEffect {
  canvasEl: CanvasEl = {} as CanvasEl;

  textX = 0;

  textY = 0;

  fontSize = 0;

  maxTextWidth = 0;

  lineHeight = 0;

  particles: Particle[] = [];

  gap = 3;

  mouse = {
    radius: 20000,
    x: 0,
    y: 0,
  };

  verticalOffset = 0;

  fontFamily = FONT_FAMILY;

  constructor({ canvasEl, text, fontFamily }: Props) {
    this.canvasEl = canvasEl;
    const { x, y } = getCenterXandY(canvasEl.canvas);
    this.textX = x;
    this.textY = y;
    this.fontSize = generateFontSize(canvasEl.canvas);
    this.maxTextWidth = canvasEl.canvas.width * 0.8;
    this.lineHeight = this.fontSize * 0.9;
    this.fontFamily = fontFamily;

    //particle text
    this.particles = [];
    this.gap = 4;
    this.mouse = {
      radius: 20000,
      x: 0,
      y: 0,
    };

    //event listener
    this.verticalOffset = 0;

    this.wrapText(text);

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
  }

  style() {
    const { canvas, context: ctx } = this.canvasEl;
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0.3, "#B68D40");
    gradient.addColorStop(0.5, "#F4EBD0");
    gradient.addColorStop(0.7, "#122620");
    ctx.font = `${this.fontSize}px 	${this.fontFamily}`;
    ctx.fillStyle = gradient;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
  }

  wrapText(text: string) {
    const { context: ctx, canvas } = this.canvasEl;
    this.style();
    const linesArray = [];
    const words = text.split(" ");
    let lineCounter = 0;
    let line = "";
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";

      if (ctx.measureText(testLine).width > this.maxTextWidth) {
        line = words[i];
        lineCounter++;
      } else {
        line = testLine; //accumlate words until maxwidth
      }
      linesArray[lineCounter] = line;
    }
    const textHeight = this.lineHeight * lineCounter;
    this.textY = canvas.height / 2 - textHeight / 2 + this.verticalOffset;
    linesArray.forEach((el, idx) => {
      ctx.fillText(el, this.textX, this.textY + idx * this.lineHeight);
      ctx.strokeText(el, this.textX, this.textY + idx * this.lineHeight);
    });

    this.convertToParticles();
  }

  updateFontFamily(fontFamily: string) {
    this.fontFamily = fontFamily;
  }

  convertToParticles() {
    const { context: ctx, canvas } = this.canvasEl;
    this.particles = [];

    //scan the data
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    //clear the data
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //go throught every pixel row by row
    for (let y = 0; y < canvas.height; y += this.gap) {
      for (let x = 0; x < canvas.width; x += this.gap) {
        const index = (y * canvas.width + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = `rgb('${red}','${green}','${blue}'})`;
          this.particles.push(
            new Particle({
              canvasEl: this.canvasEl,
              effect: this,
              color,
              x,
              y,
            })
          );
        }
      }
    }
  }

  render() {
    this.particles.forEach((particle) => {
      particle.update();
    });
  }

  resize() {
    const { x, y } = getCenterXandY(this.canvasEl.canvas);
    this.textX = x;
    this.textY = y;
    this.maxTextWidth = this.canvasEl.canvas.width * 0.8;
    this.fontSize = generateFontSize(this.canvasEl.canvas);
  }
}

export default TextEffect;
