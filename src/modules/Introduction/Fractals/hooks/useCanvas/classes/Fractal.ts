import { getCursorPosition } from "@src/lib/utils/canvas";
import { CanvasEl, Cursor } from "@src/typings/canvas";

interface Props {
  canvasEl: CanvasEl;
  sides: number;
  scale: number;
  spread: number;
  lineWidth: number;
  maxLevel: number;
}
class Fractal {
  canvasEl: CanvasEl = {} as CanvasEl;

  size = 0;

  sides = 0;

  scale = 0;

  color = "";

  lineWidth = 0;

  maxLevel = 0;

  branches = 0;

  // controls
  spread = 0;

  offsideBranchEffect = 0;

  cursor: Cursor = {
    pressed: false,
    radius: 200,
    x: 0,
    y: 0,
  };

  // Event handler references (to remove them later)
  private handleMouseMove = (e: MouseEvent) => {
    const { x, y } = getCursorPosition({
      canvas: this.canvasEl.canvas,
      cursorX: e.x,
      cursorY: e.y,
    });
    this.cursor.x = x;
    this.cursor.y = y;
  };

  private handleTouchMove = (e: TouchEvent) => {
    const { x, y } = getCursorPosition({
      canvas: this.canvasEl.canvas,
      cursorX: e.touches[0].clientX,
      cursorY: e.touches[0].clientY,
    });
    this.cursor.x = x;
    this.cursor.y = y;
  };

  constructor(props: Props) {
    this.canvasEl = props.canvasEl;
    this.sides = props.sides;
    this.scale = props.scale;
    this.spread = props.spread;
    this.lineWidth = props.lineWidth;
    this.maxLevel = props.maxLevel;
    this.offsideBranchEffect = 0;

    const canvas = props.canvasEl.canvas;
    this.branches = 2;
    this.size =
      canvas.width < canvas.height ? canvas.width * 0.2 : canvas.height * 0.2;

    this.color = `hsl(${Math.random() * 360},100%,50%)`;

    // Attach event listeners
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("touchmove", this.handleTouchMove);
  }

  draw() {
    const { context: ctx, canvas } = this.canvasEl;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    for (let i = 0; i < this.sides; i++) {
      ctx.rotate((Math.PI * 2) / this.sides);
      this.drawBranch(0);
    }

    ctx.restore();
  }

  update() {
    const hue = (this.cursor.x / window.innerWidth) * 360; // Map x to hue (0-360)
    const lightness = (this.cursor.y / window.innerHeight) * 100; // Map y to lightness (0-100)
    this.color = `hsl(${hue}, 100%, ${lightness}%)`;
    const { context: ctx, canvas } = this.canvasEl;

    // Calculate rotation based on cursor position
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const deltaX = this.cursor.x - centerX;
    const deltaY = this.cursor.y - centerY;

    const angle = Math.atan2(deltaY, deltaX); // Get angle from cursor position

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ctx.translate(centerX, centerY); // Move to the center
    ctx.rotate(angle); // Apply rotation
    ctx.translate(-centerX, -centerY); // Move back

    this.draw();

    ctx.restore();
  }

  updateSpread(spread: number) {
    this.spread = spread;
  }

  updateOffsideBranchEffect(offsideBranchEffect: number) {
    this.offsideBranchEffect = offsideBranchEffect;
  }

  drawBranch(level: number) {
    if (level > this.maxLevel) return;
    const { context: ctx } = this.canvasEl;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.size, 0); // size - 80 for ex. offset effect for the branch starting position
    ctx.stroke();

    for (let i = 0; i < this.branches; i++) {
      ctx.save();
      ctx.translate(
        this.size - (this.size / this.branches) * i,
        this.offsideBranchEffect
      ); // create offside branch effect, the more the value is the more offside the branch
      ctx.scale(this.scale, this.scale);

      ctx.save();
      ctx.rotate(this.spread);
      this.drawBranch(level + 1);
      ctx.restore();

      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, this.size, this.size * 0.1, 0, Math.PI * 2);
    ctx.fill();
  }

  destroy() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("touchmove", this.handleTouchMove);

    this.canvasEl.context.clearRect(
      0,
      0,
      this.canvasEl.canvas.width,
      this.canvasEl.canvas.height
    );
  }
}

export default Fractal;
