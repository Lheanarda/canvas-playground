import { CanvasEl } from "@src/typings/canvas";
import Player from "./Player";
import { SIZE_DEFAULT } from "../constants";

interface Props {
  canvasEl: CanvasEl;
  x: number;
  y: number;
  player: Player;
}
class Dice {
  canvasEl: CanvasEl = {} as CanvasEl;

  x = 0;

  y = 0;

  size = 0;

  vx = 0;

  vy = 0;

  collisionBottom = 0;

  collisionLeft = 0;

  collisionRight = 0;

  validation = 0;

  randomize = false;

  value = 1;

  player = {} as Player;

  constructor(props: Props) {
    this.canvasEl = props.canvasEl;
    this.x = props.x;
    this.y = props.y;
    this.size = 1.5 * SIZE_DEFAULT;

    this.vx = 0;
    this.vy = 0;

    this.player = props.player;

    this.collisionBottom = this.y + this.size;
    this.collisionLeft = this.x;
    this.collisionRight = this.x + 200;

    this.validation = 0;
    this.randomize = false;
    this.value = 1;

    window.addEventListener("click", () => this.rollDice());

    window.addEventListener("touchend", () => this.rollDice());
    // window.addEventListener('touchend',() => this.player.move(1))
  }

  draw() {
    const ctx = this.canvasEl.context;
    ctx.fillStyle = "#ffe4e6";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    //dice
    ctx.strokeRect(this.x, this.y, this.size, this.size);
    ctx.fillRect(this.x, this.y, this.size, this.size);

    //button
    ctx.fillStyle = "white";
    ctx.strokeRect(
      this.collisionLeft,
      this.collisionBottom - this.size,
      this.size,
      this.size
    );
    ctx.fillRect(
      this.collisionLeft,
      this.collisionBottom - this.size,
      this.size,
      this.size
    );

    ctx.fillStyle = "black";
    ctx.fillText(
      "roll!",
      this.collisionLeft + this.size / 2,
      this.collisionBottom - this.size + this.size / 2
    );
  }

  update() {
    this.draw();
    this.vy += this.size * 0.05;
    this.y += this.vy;

    this.x += this.vx;

    if (this.randomize) {
      const random = Math.floor(Math.random() * 5 + 1);
      this.value = random;
    }
    if (this.x !== this.collisionLeft) this.renderNumber(this.value);

    if (this.y + this.size >= this.collisionBottom) {
      this.vy *= -1;
      this.y = this.collisionBottom - this.size;
    }
    if (this.x + this.size >= this.collisionRight) {
      this.x = this.collisionRight - this.size;
    }

    //validation dice move
    if (
      this.x === this.collisionRight - this.size &&
      this.y === this.collisionBottom - this.size
    ) {
      this.validation++;
    }
    if (this.validation === 40) {
      this.randomize = false;
      this.player.move(this.value);
    }
  }

  renderRandomNumber() {
    const ctx = this.canvasEl.context;
    const random = Math.floor(Math.random() * 5 + 1);
    ctx.fillStyle = "#4f46e5";
    ctx.font = "35px Permanent Marker";
    ctx.fillText(
      String(random),
      this.x + this.size / 2,
      this.y + this.size / 2
    );
    this.value = random;
  }

  renderNumber(number: number) {
    const ctx = this.canvasEl.context;
    ctx.fillStyle = "#be123c";
    ctx.font = "35px Permanent Marker";
    ctx.fillText(
      String(number),
      this.x + this.size / 2,
      this.y + this.size / 2
    );
  }

  rollDice() {
    if (this.randomize || !this.player.readyToMove) return;
    this.validation = 0;
    this.randomize = true;
    const randomVy = -Math.floor(Math.random() * 10 + 15);
    this.x = this.collisionLeft;
    this.vy = randomVy;
    this.vx = 3;
  }
}

export default Dice;
