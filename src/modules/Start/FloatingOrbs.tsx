import { useEffect, useRef } from "react";

const FloatingOrbs = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbs: any[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 300;
    canvas.height = canvas.parentElement?.clientHeight || 300;

    const orbCount = 15;
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const fadeDistance = 50; // Distance from edge where fading starts

    // Initialize Orbs
    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 20 + 10,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        baseRadius: Math.random() * 20 + 10,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      });
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        orb.x += orb.speedX;
        orb.y += orb.speedY;

        let alpha = 1;

        // Calculate fade based on proximity to edges
        if (orb.x < fadeDistance) {
          alpha = Math.max(0, orb.x / fadeDistance);
          if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        } else if (orb.x > canvas.width - fadeDistance) {
          alpha = Math.max(0, (canvas.width - orb.x) / fadeDistance);
          if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        }

        if (orb.y < fadeDistance) {
          alpha = Math.min(alpha, Math.max(0, orb.y / fadeDistance));
          if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        } else if (orb.y > canvas.height - fadeDistance) {
          alpha = Math.min(
            alpha,
            Math.max(0, (canvas.height - orb.y) / fadeDistance)
          );
          if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;
        }

        // Parallax Effect
        const dx = mouse.x - orb.x;
        const dy = mouse.y - orb.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        const factor = 1 - Math.min(distance / maxDist, 1);

        orb.radius = orb.baseRadius + factor * 10;

        // Draw Orb with fade effect
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = orb.color;
        ctx.globalAlpha = alpha * 0.8;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    // Mouse Move Effect
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full rounded-lg" />;
};

export default FloatingOrbs;
