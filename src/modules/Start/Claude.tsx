import useTheme from "@src/lib/hooks/useTheme";
import { useState, useRef, useEffect } from "react";
import FloatingOrbs from "./FloatingOrbs";
import useForceFullPageReloadOnNavigation from "./useForceFullPageNavigation";
import Card from "@src/components/Card";

const CanvasPresentation = () => {
  useForceFullPageReloadOnNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const appTheme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  // Define the slides content
  const slides = [
    {
      title: "Canvas is versatile",
      description:
        "HTML5 Canvas enables you to create a wide range of visual content from simple shapes to complex animations.",
      animationId: "bouncing-ball",
    },
    {
      title: "Great for game development",
      description:
        "Canvas provides the perfect foundation for 2D games with its ability to render graphics quickly and handle interactions.",
      animationId: "game-character",
    },
    {
      title: "Supports real-time drawing",
      description:
        "Create drawing applications where users can interact directly with the canvas element.",
      animationId: "drawing",
    },
    {
      title: "Optimized for performance",
      description:
        "Canvas is designed for high-performance rendering, making it suitable for complex animations and visualizations.",
      animationId: "particles",
    },
    {
      title: "Used in data visualization",
      description:
        "Create interactive charts, graphs, and other data visualizations that respond to user input.",
      animationId: "chart",
    },
  ];

  // Custom canvas setup that extends the provided useCanvas hook
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make canvas responsive
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Clear any previous animations
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let animationFrameId: number;

    // Animation logic based on current slide
    switch (slides[currentSlide].animationId) {
      case "bouncing-ball":
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let dx = 4;
        let dy = 4;
        const radius = 20;

        const drawBall = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = "#3498db";
          ctx.fill();
          ctx.closePath();

          // Bounce off walls
          if (x + dx > canvas.width - radius || x + dx < radius) {
            dx = -dx;
          }
          if (y + dy > canvas.height - radius || y + dy < radius) {
            dy = -dy;
          }

          x += dx;
          y += dy;

          animationFrameId = requestAnimationFrame(drawBall);
        };

        drawBall();
        break;

      case "game-character":
        let charX = 50;
        const charY = canvas.height / 2;
        const charWidth = 30;
        const charHeight = 50;
        let isMovingRight = true;

        const drawCharacter = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw platform
          ctx.fillStyle = "#27ae60";
          ctx.fillRect(0, charY + charHeight, canvas.width, 5);

          // Draw character
          ctx.fillStyle = "#e74c3c";
          ctx.fillRect(charX, charY, charWidth, charHeight);

          // Simple face
          ctx.fillStyle = "#fff";
          ctx.fillRect(charX + 7, charY + 15, 5, 5);
          ctx.fillRect(charX + 18, charY + 15, 5, 5);
          ctx.fillRect(charX + 10, charY + 30, 10, 3);

          // Move character
          if (isMovingRight) {
            charX += 2;
            if (charX > canvas.width - charWidth - 50) {
              isMovingRight = false;
            }
          } else {
            charX -= 2;
            if (charX < 50) {
              isMovingRight = true;
            }
          }

          animationFrameId = requestAnimationFrame(drawCharacter);
        };

        drawCharacter();
        break;

      case "drawing":
        // This is handled by the event listeners below
        ctx.fillStyle = "#f5f5f5";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Instructions
        ctx.font = "16px Arial";
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.fillText("Click and drag to draw", canvas.width / 2, 30);
        break;

      case "particles":
        const particles: any[] = [];
        const particleCount = 100;

        // Create particles
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 1,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            vx: Math.random() * 4 - 2,
            vy: Math.random() * 4 - 2,
          });
        }

        const drawParticles = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          particles.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off walls
            if (particle.x < 0 || particle.x > canvas.width)
              particle.vx = -particle.vx;
            if (particle.y < 0 || particle.y > canvas.height)
              particle.vy = -particle.vy;
          });

          animationFrameId = requestAnimationFrame(drawParticles);
        };

        drawParticles();
        break;

      case "chart":
        const data = [150, 230, 180, 320, 270];
        const labels = ["Jan", "Feb", "Mar", "Apr", "May"];
        const barWidth = 60;
        const spacing = 30;
        const startX =
          (canvas.width - ((barWidth + spacing) * data.length - spacing)) / 2;
        const maxHeight = canvas.height - 100;

        let heightMultiplier = 0;
        const animationSpeed = 0.02;

        const drawChart = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw title
          ctx.font = "18px Arial";
          ctx.fillStyle = "#cecece";
          ctx.textAlign = "center";
          ctx.fillText("Monthly Sales Data", canvas.width / 2, 30);

          // Draw bars
          for (let i = 0; i < data.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const x = startX + i * (barWidth + spacing);
            const height = (data[i] / 320) * maxHeight * heightMultiplier;
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const y = canvas.height - 60 - height;

            // Draw bar
            ctx.fillStyle = `hsl(${i * 50}, 70%, 60%)`;
            ctx.fillRect(x, y, barWidth, height);

            // Draw label
            ctx.font = "14px Arial";
            ctx.fillStyle = "#333";
            ctx.textAlign = "center";
            ctx.fillText(labels[i], x + barWidth / 2, canvas.height - 30);

            // Draw value
            if (heightMultiplier > 0.7) {
              ctx.fillStyle = "#fff";
              ctx.fillText(data[i].toString(), x + barWidth / 2, y + 20);
            }
          }

          // Animation
          if (heightMultiplier < 1) {
            heightMultiplier += animationSpeed;
          }

          animationFrameId = requestAnimationFrame(drawChart);
        };

        drawChart();
        break;

      default:
        break;
    }

    // Cleanup function
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  // Drawing functionality for slide 3
  useEffect(() => {
    if (!canvasRef.current || slides[currentSlide].animationId !== "drawing")
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const startDrawing = (e: any) => {
      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      setLastPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const draw = (e: any) => {
      if (!isDrawing || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.beginPath();
      ctx.strokeStyle = "#3498db";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      setLastPos({ x, y });
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, isDrawing, lastPos]);

  // Navigation handlers
  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="flex space-x-3 pt-10">
      <Card outline className="px-8 pt-8 pb-6 ">
        {/* Content */}
        <div className="mb-8 h-24">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            {slides[currentSlide].title}
          </h2>
          <p className={`text-lg ${appTheme.text}`}>
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Canvas Container */}
        <div className="relative w-full h-64 border border-slate-600 rounded-lg mb-6 overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={goToPrevSlide}
            disabled={currentSlide === 0}
            className={`px-4 py-2 rounded ${
              currentSlide === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          {/* Progress indicator */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>

          <button
            onClick={goToNextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`px-4 py-2 rounded ${
              currentSlide === slides.length - 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </Card>
      <div className="flex-initial w-[30%]">
        <FloatingOrbs />
      </div>
    </div>
  );
};

export default CanvasPresentation;
