import { CanvasEl } from "@src/typings/canvas";
import { SIZE_DEFAULT, TOTAL_COLUMNS, TOTAL_ROWS } from "../constants";
import Block, { BoardAction } from "./Block";

const JUMP = -4;
const JUMP_UP = -8;

interface Props {
  canvasEl: CanvasEl;
  blocks: Block[];
  imageSrc: string;
}

class Player {
  canvasEl: CanvasEl = {} as CanvasEl;

  width = 0;

  height = 0;

  blocks: Block[] = [];

  x = 0;

  y = 0;

  vx = 0;

  vy = 0;

  currentBottomCollision = 0;

  currentRightCollision = 0;

  currentLeftCollision = 0;

  gravityX: "left" | "right" = "right";

  debug = false;

  image: HTMLImageElement = {} as HTMLImageElement;

  intervals: NodeJS.Timer[] = [];

  readyToMove = false;

  currentBlock = 0;

  constructor(props: Props) {
    this.canvasEl = props.canvasEl;
    this.width = SIZE_DEFAULT * 0.8; // 0.8
    this.height = SIZE_DEFAULT * 0.8;
    this.blocks = props.blocks;
    const initialBlockIndex = TOTAL_COLUMNS * (TOTAL_ROWS - 1);

    const { x, y } = this.anchorCenterPositionInBlock(
      this.blocks[initialBlockIndex]
    );
    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;

    this.currentBottomCollision = y + this.height;
    this.currentRightCollision = x + this.width;
    this.currentLeftCollision = x - SIZE_DEFAULT;

    this.gravityX = "right";

    this.debug = false;

    //image player
    this.image = new Image();
    this.image.src = props.imageSrc;
    this.intervals = [];

    this.readyToMove = true;

    this.currentBlock = 1;

    window.addEventListener("keyup", (e) => {
      if (e.key === "d") this.moveRight();
      if (e.key === "a") this.moveLeft();
      if (e.key === "w") this.moveUp();
      if (e.key === "s") this.moveDown();
      if (e.key === "z") this.debug = !this.debug;
      if (e.key === "m") this.move(3);
    });
  }

  draw() {
    const ctx = this.canvasEl.context;
    // ctx.fillStyle = '#f43f5e'
    // ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    if (this.debug) {
      //debug
      ctx.fillStyle = "black";
      //left
      ctx.fillRect(
        this.currentLeftCollision,
        this.currentBottomCollision,
        4,
        4
      );
      //right
      ctx.fillRect(
        this.currentRightCollision - 4,
        this.currentBottomCollision,
        4,
        4
      );
    }
  }

  update() {
    this.draw();

    if (this.gravityX === "right") this.vx += this.width * 0.012;
    else if (this.gravityX === "left") this.vx -= this.width * 0.012;

    this.vy += this.height * 0.01;

    this.y += this.vy;
    this.x += this.vx;

    if (this.y + this.height >= this.currentBottomCollision && this.vy >= 0) {
      this.y = this.currentBottomCollision - this.height;
      this.vy = 0;
    }

    if (this.x <= this.currentLeftCollision) {
      this.x = this.currentLeftCollision;
      this.vx = 0;
    }

    if (this.x > this.currentRightCollision - this.width) {
      this.x = this.currentRightCollision - this.width;
      this.vx = 0;
    }
  }

  move(totalMove: number) {
    //star interval
    // totalMove = 3
    let countTotalDiceMove = 0;
    this.readyToMove = false;
    this.intervals = [];
    const interval = setInterval(() => {
      //clear interval
      if (countTotalDiceMove >= totalMove) {
        this.readyToMove = true;
        return this.intervals.forEach((i) => {
          window.clearInterval(i);
        });
      }
      const currentBlock = this.getCurrentBlock();
      if (currentBlock) {
        if (this.currentBlock !== currentBlock.boardIndex) return;

        if (currentBlock.direction === "up") {
          this.moveUp();
          this.currentBlock = currentBlock.boardIndex + 1;
        } else if (currentBlock.direction === "right") {
          this.moveRight();
          this.currentBlock = currentBlock.boardIndex + 1;
        } else if (currentBlock.direction === "left") {
          this.moveLeft();
          this.currentBlock = currentBlock.boardIndex + 1;
        }
        countTotalDiceMove++;

        if (countTotalDiceMove === totalMove) {
          const placedBlock = this.blocks.find(
            (b) => b.boardIndex === currentBlock.boardIndex + 1
          );
          if (placedBlock && placedBlock.action) {
            this.moveOnAction(placedBlock.action);
            this.currentBlock = placedBlock.action.boardIndexDestination;
          }
        }
      }
    }, 500);

    this.intervals.push(interval);
  }

  moveRight() {
    if (this.x !== this.currentLeftCollision) {
      this.currentRightCollision = this.currentRightCollision + SIZE_DEFAULT;
      this.currentLeftCollision = this.currentLeftCollision + SIZE_DEFAULT;
    }
    this.vy = JUMP;
    this.gravityX = "right";
  }

  moveLeft() {
    if (this.x === this.currentLeftCollision) {
      this.currentLeftCollision = this.currentLeftCollision - SIZE_DEFAULT;
      this.currentRightCollision = this.currentRightCollision - SIZE_DEFAULT;
    }
    this.gravityX = "left";
    this.vy = JUMP;
  }

  moveUp() {
    this.vy = JUMP_UP;
    this.currentBottomCollision -= SIZE_DEFAULT;
  }

  moveDown() {
    this.currentBottomCollision += SIZE_DEFAULT;
  }

  moveOnAction(action: BoardAction) {
    const foundDestinationBlock = this.blocks.find(
      (b) => b.boardIndex === action.boardIndexDestination
    );
    if (!foundDestinationBlock) return;

    const { x } = this.anchorCenterPositionInBlock(foundDestinationBlock);

    setTimeout(() => {
      const { y } = this.anchorCenterPositionInBlock(foundDestinationBlock);
      this.currentBottomCollision = y + this.height;

      //if move up
      if (foundDestinationBlock.y < this.y)
        this.vy = Math.floor((this.currentBottomCollision - this.y) / 6);
      this.gravityX = "right";
      this.currentRightCollision = x + this.width;
      this.currentLeftCollision = x - SIZE_DEFAULT;
    }, 800);
  }

  anchorCenterPositionInBlock(block: Block) {
    const { x: newX, y: newY } = block.getCenter();

    return {
      x: newX - this.width / 2,
      y: newY - this.height / 2,
    };
  }

  getCurrentBlock() {
    let currentBlock;
    for (let i = 0; i < this.blocks.length; i++) {
      const left = this.blocks[i].x;
      const right = this.blocks[i].x + this.blocks[i].size;
      const top = this.blocks[i].y;
      const bottom = this.blocks[i].y + this.blocks[i].size;

      const { x, y } = this.anchorCenterPositionInBlock(this.blocks[i]);

      if (
        this.x >= left &&
        this.x <= right &&
        this.y >= top &&
        this.y <= bottom
      ) {
        currentBlock = this.blocks[i];
        break;
      }
    }

    return currentBlock;
  }
}

export default Player;
