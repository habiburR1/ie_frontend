import React, { useState, useEffect, useRef } from "react";
import "./CursorAnimation.css";

const CursorAnimation: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dotRef = useRef<HTMLDivElement | null>(null); // Reference to the dot element

  // Track mouse movement and update the position state
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop using requestAnimationFrame for smooth updates
  useEffect(() => {
    let animationFrameId: number;

    const updateDotPosition = () => {
      if (dotRef.current) {
        // Smoothly interpolate between current dot position and mouse position
        const currentX = parseFloat(dotRef.current.style.left || "0");
        const currentY = parseFloat(dotRef.current.style.top || "0");

        const newX = currentX + (position.x - currentX) * 0.1; // Adjust 0.1 for smoothness
        const newY = currentY + (position.y - currentY) * 0.1;

        dotRef.current.style.left = `${newX}px`;
        dotRef.current.style.top = `${newY}px`;
      }

      animationFrameId = requestAnimationFrame(updateDotPosition);
    };

    animationFrameId = requestAnimationFrame(updateDotPosition);

    return () => cancelAnimationFrame(animationFrameId); // Clean up on unmount
  }, [position]);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ top: "0px", left: "0px" }}
      />
    </>
  );
};

export default CursorAnimation;
