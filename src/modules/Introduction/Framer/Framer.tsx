import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ParticleProps } from "./typings";
import { handleRandomRadius, handleGetDistanceBetween2Circle } from "./utils";

const TOTAL_PARTICLES = 200;
const MAX_DISTANCE = 40;
const COLOR_STROKE = "#00bcd4";
const MIN_SPEED = 0.2;
const MAX_SPEED = 2;

const EffectParticles: React.FC = () => {
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [startAnimation, setStartAnimation] = useState<boolean>(false);

  // Get random position within container bounds
  const getRandomPosition = (radius: number) => {
    return {
      x: radius + Math.random() * (containerSize.width - 2 * radius),
      y: radius + Math.random() * (containerSize.height - 2 * radius),
    };
  };

  const generateRandomVelocity = () => {
    const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
    const angle = Math.random() * 2 * Math.PI;
    return {
      velocityX: speed * Math.cos(angle),
      velocityY: speed * Math.sin(angle),
    };
  };

  // Update container size when mounted and on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { offsetWidth } = containerRef.current;
        setContainerSize({ width: offsetWidth, height: 500 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Initialize particles when container size is known
  useEffect(() => {
    if (containerSize.width && containerSize.height) {
      const initialParticles = Array.from({ length: TOTAL_PARTICLES }, () => {
        const radius = handleRandomRadius();
        const { x, y } = getRandomPosition(radius);
        return {
          x,
          y,
          radius,
          ...generateRandomVelocity(),
        };
      });

      setParticles(initialParticles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerSize]);

  useEffect(() => {
    if (!containerSize.width || !containerSize.height) return;

    const moveParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.velocityX;
          let newY = particle.y + particle.velocityY;
          let velocityX = particle.velocityX;
          let velocityY = particle.velocityY;

          // Bounce off container walls
          if (
            newX - particle.radius <= 0 ||
            newX + particle.radius >= containerSize.width
          ) {
            velocityX = -velocityX;
            velocityY += (Math.random() - 0.5) * 0.5;
          }
          if (
            newY - particle.radius <= 0 ||
            newY + particle.radius >= containerSize.height
          ) {
            velocityY = -velocityY;
            velocityX += (Math.random() - 0.5) * 0.5;
          }

          // Normalize speed
          const currentSpeed = Math.sqrt(
            velocityX * velocityX + velocityY * velocityY
          );
          if (currentSpeed > MAX_SPEED) {
            const scale = MAX_SPEED / currentSpeed;
            velocityX *= scale;
            velocityY *= scale;
          } else if (currentSpeed < MIN_SPEED) {
            const scale = MIN_SPEED / currentSpeed;
            velocityX *= scale;
            velocityY *= scale;
          }

          // Keep particles within container bounds
          newX = Math.min(
            Math.max(newX, particle.radius),
            containerSize.width - particle.radius
          );
          newY = Math.min(
            Math.max(newY, particle.radius),
            containerSize.height - particle.radius
          );

          return {
            ...particle,
            x: newX,
            y: newY,
            velocityX,
            velocityY,
          };
        })
      );
    };

    let animationFrameId: number;
    const animate = () => {
      if (startAnimation) {
        moveParticles();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [containerSize, startAnimation]);

  const connectParticles = () => {
    const connections = [];
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const distance = handleGetDistanceBetween2Circle(
          particles[a],
          particles[b]
        );

        if (distance <= MAX_DISTANCE) {
          const opacity = 1 - distance / MAX_DISTANCE;
          connections.push({
            xA: particles[a].x,
            yA: particles[a].y,
            xB: particles[b].x,
            yB: particles[b].y,
            opacity,
          });
        }
      }
    }
    return connections;
  };

  const renderConnections = connectParticles();

  return (
    <>
      <button
        className="px-2 py-1 rounded bg-primary text-white font-bold text-sm"
        onClick={() => setStartAnimation(!startAnimation)}
      >
        Toggle Animation : {startAnimation ? "ON" : "OFF"}
      </button>
      <div
        ref={containerRef}
        id="container-framer"
        className="effect-particles"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <svg
          className="effect-particles-svg"
          width="100%"
          height="100%"
          viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {renderConnections.map((connection, index) => (
            <motion.line
              key={index}
              x1={connection.xA}
              y1={connection.yA}
              x2={connection.xB}
              y2={connection.yB}
              stroke={COLOR_STROKE}
              strokeWidth={1}
              style={{ opacity: connection.opacity }}
              initial={{ opacity: 0 }}
              animate={{ opacity: connection.opacity }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </svg>

        {particles.map((particle, index) => (
          <motion.div
            key={index}
            style={{
              position: "absolute",
              left: particle.x - particle.radius,
              top: particle.y - particle.radius,
              width: particle.radius * 2,
              height: particle.radius * 2,
              borderRadius: "50%",
              background: COLOR_STROKE,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </>
  );
};

export default EffectParticles;
