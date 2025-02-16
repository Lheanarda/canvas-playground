import { getCursorPosition } from "@src/lib/utils/canvas";
import { CanvasEl, Cursor, Position, Velocity } from "@src/typings/canvas";

interface Props {
  position: Position;
  radius: number;
  canvasEl: CanvasEl;
  mass: number;
}

class Ball {
  position: Position = {
    x: 0,
    y: 0,
  };

  canvasEl = {} as CanvasEl;

  radius = 0;

  velocity: Velocity = {
    x: 0,
    y: 2, // Start with a slightly higher initial velocity
  };

  gravity = 0.3;

  mass = 0;

  bounceFactor = 0.7; // Energy loss on bounce (1 = perfect bounce, <1 = damping)

  cursorPressed = false;

  private checkBallClicked(x: number, y: number) {
    let clicked = false;
    const dx = x - this.position.x;
    const dy = y - this.position.y;
    const distance = dx * dx + dy * dy;
    if (distance <= this.radius * this.radius) {
      clicked = true;
    }
    return clicked;
  }

  // mouse event handlers
  private handleMouseDown = (e: MouseEvent) => {
    const { x, y } = getCursorPosition({
      canvas: this.canvasEl.canvas,
      cursorX: e.x,
      cursorY: e.y,
    });
    const isInPosition = this.checkBallClicked(x, y);
    if (isInPosition) {
      this.cursorPressed = true;
      this.position.x = x;
      this.position.y = y;
    }
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.cursorPressed) return;
    const { x, y } = getCursorPosition({
      canvas: this.canvasEl.canvas,
      cursorX: e.x,
      cursorY: e.y,
    });
    this.position.x = x;
    this.position.y = y;
  };

  private handleMouseUp = () => {
    this.cursorPressed = false;
  };

  // touch event handlers
  private handleTouchMove = (e: TouchEvent) => {
    if (!this.cursorPressed) return;
    const { x, y } = getCursorPosition({
      canvas: this.canvasEl.canvas,
      cursorX: e.touches[0].clientX,
      cursorY: e.touches[0].clientY,
    });
    this.position.x = x;
    this.position.y = y;
  };

  private handleTouchStart = (e: TouchEvent) => {
    const { x, y } = getCursorPosition({
      canvas: this.canvasEl.canvas,
      cursorX: e.touches[0].clientX,
      cursorY: e.touches[0].clientY,
    });
    const isInPosition = this.checkBallClicked(x, y);
    if (isInPosition) {
      this.cursorPressed = true;
      this.position.x = x;
      this.position.y = y;
    }
  };

  private handleTouchEnd = () => {
    this.cursorPressed = false;
  };

  constructor(props: Props) {
    this.position = props.position;
    this.radius = props.radius;
    this.canvasEl = props.canvasEl;
    this.mass = props.mass;

    // mouse event
    window.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("mouseup", this.handleMouseUp);
    window.addEventListener("mousemove", this.handleMouseMove);

    // touch event
    window.addEventListener("touchstart", this.handleTouchStart);
    window.addEventListener("touchmove", this.handleTouchMove);
    window.addEventListener("touchend", this.handleTouchEnd);
  }

  draw() {
    const { context } = this.canvasEl;
    const { x, y } = this.position;
    context.fillStyle = "orangered";
    context.beginPath();
    context.arc(x, y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  }

  update() {
    const { canvas } = this.canvasEl;
    this.draw();
    const bottom = canvas.height - this.radius - 10;

    // only apply gravity logic when ball is not moved
    if (!this.cursorPressed) {
      // Apply velocity first, then gravity
      this.velocity.y += this.gravity * this.mass;
      this.position.y += this.velocity.y;

      // Bounce logic
      if (this.position.y >= bottom) {
        this.velocity.y *= -this.bounceFactor; // Reverse velocity with energy loss
        this.position.y = bottom; // Prevent sinking below the ground
      }
    }
  }
}

export default Ball;
