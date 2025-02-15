interface GetCursorPositionProps {
  canvas: HTMLCanvasElement;
  cursorX: number;
  cursorY: number;
}
export const getCursorPosition = ({
  canvas,
  cursorX,
  cursorY,
}: GetCursorPositionProps) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width; // Correct for scale
  const scaleY = canvas.height / rect.height; // Correct for scale
  const x = (cursorX - rect.left) * scaleX; // Adjust for scaling
  const y = (cursorY - rect.top) * scaleY; // Adjust for scaling
  return { x, y };
};
