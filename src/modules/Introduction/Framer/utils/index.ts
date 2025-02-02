export const handleRandomRadius = () => Math.random() * 5 + 2; // Random radius between 2 and 7

export const handleGetRandomPosition = (
  radius: number,
  width: number,
  height: number
) => {
  const x = Math.random() * (width - radius * 2) + radius;
  const y = Math.random() * (height - radius * 2) + radius;
  return { x, y };
};

export const handleGetDistanceBetween2Circle = (
  circle1: { x: number; y: number },
  circle2: { x: number; y: number }
) => {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  return Math.sqrt(dx * dx + dy * dy);
};
