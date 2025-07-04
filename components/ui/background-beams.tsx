"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"; // Import motion from framer-motion

export const BackgroundBeams = ({ className, ...rest }: { className?: string; [key: string]: any }) => {
  const [interactive, setInteractive] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef<HTMLDivElement>(null);
 
  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };
 
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
    }
 
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [interactive]);
 
  const beams = React.useMemo(() => {
    const numBeams = 10; // Number of beams
    const beamsArray = [];
    for (let i = 0; i < numBeams; i++) {
      beamsArray.push(
        <Beam
          key={i}
          index={i}
          mousePosition={mousePosition}
          interactive={interactive}
        />
      );
    }
    return beamsArray;
  }, [mousePosition, interactive]); // Removed rest from dependencies
 
  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden",
        className
      )}
    >
      {beams}
    </div>
  );
};
 
const Beam = ({
  index,
  mousePosition,
  interactive,
}: {
  index: number;
  mousePosition: { x: number; y: number };
  interactive: boolean;
}) => {
  const beamRef = React.useRef<HTMLDivElement>(null);
 
  const calculatePosition = React.useCallback(() => {
    if (!beamRef.current) return;
 
    const { width, height } = beamRef.current.getBoundingClientRect();
    const angle = Math.random() * 360;
    const distance = Math.random() * Math.max(width, height);
 
    const x = Math.cos(angle * (Math.PI / 180)) * distance;
    const y = Math.sin(angle * (Math.PI / 180)) * distance;
 
    return { x, y, angle };
  }, []);
 
  const [position, setPosition] = React.useState(calculatePosition);
 
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPosition(calculatePosition());
    }, 5000); // Change beam position every 5 seconds
 
    return () => clearInterval(interval);
  }, [calculatePosition]);
 
  return (
    <motion.div
      ref={beamRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "absolute",
        left: interactive ? mousePosition.x : position?.x,
        top: interactive ? mousePosition.y : position?.y,
        width: "100px", // Adjust beam width
        height: "100px", // Adjust beam height
        background: "linear-gradient(90deg, rgba(150, 150, 250, 0) 0%, rgba(150, 150, 250, 0.5) 50%, rgba(150, 150, 250, 0) 100%)",
        borderRadius: "50%",
        filter: "blur(20px)",
        transform: `rotate(${position?.angle}deg)`,
        zIndex: 1,
      }}
    />
  );
};
