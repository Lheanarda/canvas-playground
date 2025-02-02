import { RefObject, useEffect } from "react";
import Block, { Direction } from "./classes/Block";
import { BLOCK_ACTION, TOTAL_COLUMNS, TOTAL_ROWS } from "./constants";
import Player from "./classes/Player";
import Dice from "./classes/Dice";
import Board from "./classes/Board";
import BoardImage from "./assets/images/board.jpg";
import PlayerImage from "./assets/images/mario.png";

const useCanvas = (ref: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (!context) return;

    //settings
    const startX = 0;
    const startY = 0;
    const blocks: Block[] = [];
    const SIZE_DEFAULT = canvas.width / 10;
    let number = TOTAL_ROWS * TOTAL_COLUMNS;
    let isDesc = true;

    for (let i = 0; i < TOTAL_ROWS; i++) {
      for (let j = 0; j < TOTAL_COLUMNS; j++) {
        let direction: Direction = isDesc ? "left" : "right";
        if (number % TOTAL_COLUMNS === 0) direction = "up";
        const foundSpecial: any = BLOCK_ACTION.find(
          // eslint-disable-next-line @typescript-eslint/no-loop-func
          (b) => b.boardIndex === number
        );
        blocks.push(
          new Block({
            x: startX + j * SIZE_DEFAULT,
            y: startY + i * SIZE_DEFAULT,
            boardIndex: number,
            direction,
            action: foundSpecial,
            canvasEl: { canvas, context },
            size: SIZE_DEFAULT,
          })
        );
        if (isDesc) number--;
        else number++;
      }
      if (isDesc) number -= TOTAL_COLUMNS - 1;
      else number -= TOTAL_COLUMNS + 1;
      isDesc = !isDesc;
    }

    const player = new Player({
      blocks,
      imageSrc: PlayerImage,
      canvasEl: { canvas, context },
    });

    const dice = new Dice({
      x: startX + 50,
      y: canvas.height - 100,
      player,
      canvasEl: { canvas, context },
    });

    const board = new Board({
      x: startX,
      y: startY,
      height: canvas.width,
      width: canvas.width,
      canvasEl: { canvas, context },
      imageSrc: BoardImage,
    });

    function animate() {
      requestAnimationFrame(animate);
      context?.clearRect(0, 0, canvas.width, canvas.height);
      board.draw();
      blocks.forEach((b) => b.draw());
      player.update();
      dice.update();
    }

    animate();
  }, [ref]);
};

export default useCanvas;
