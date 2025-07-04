"use client";
import React from "react";
import { cn } from "@/lib/utils";
 
export const BeamsBackground = ({
  className,
  beams = 10,
  color = "hsl(210 40% 98%)",
  size = 0.2,
  duration = 10,
  fade = true,
  interactive = false,
  ...rest
}: {
  className?: string;
  beams?: number;
  color?: string;
  size?: number;
  duration?: number;
  fade?: boolean;
  interactive?: boolean;
  [key: string]: any;
}) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);
 
  React.useEffect(() => {
    if (!interactive || !containerRef.current) return;
 
    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };
 
    containerRef.current.addEventListener("mousemove", handleMouseMove);
 
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [interactive]);
 
  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden",
        className
      )}
      style={{
        background: "transparent",
      }}
      {...rest}
    >
      {[...Array(beams)].map((_, i) => (
        <svg
          key={i}
          className={cn(
            "absolute inset-0 h-full w-full",
            fade && "animate-fade-in"
          )}
          style={{
            animationDuration: `${duration}s`,
            animationDelay: `${i * (duration / beams)}s`,
          }}
        >
          <defs>
            <linearGradient id={`beamGradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0" />
              <stop offset="50%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect
            x={interactive ? mousePosition.x : Math.random() * 100 + "%"}
            y={interactive ? mousePosition.y : Math.random() * 100 + "%"}
            width={`${size * 100}px`}
            height={`${size * 100}px`}
            fill={`url(#beamGradient-${i})`}
            transform={`rotate(${Math.random() * 360} ${interactive ? mousePosition.x : 0} ${interactive ? mousePosition.y : 0})`}
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from={`0 ${interactive ? mousePosition.x : 0} ${interactive ? mousePosition.y : 0}`}
              to={`360 ${interactive ? mousePosition.x : 0} ${interactive ? mousePosition.y : 0}`}
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="x"
              from={interactive ? mousePosition.x : Math.random() * 100 + "%"}
              to={interactive ? mousePosition.x : Math.random() * 100 + "%"}
              dur={`${duration}s`}
              repeatCount="indefinite"
              keyTimes="0;0.5;1"
              values={`${interactive ? mousePosition.x : Math.random() * 100 + "%"};${interactive ? mousePosition.x : Math.random() * 100 + "%"};${interactive ? mousePosition.x : Math.random() * 100 + "%"}`}
            />
            <animate
              attributeName="y"
              from={interactive ? mousePosition.y : Math.random() * 100 + "%"}
              to={interactive ? mousePosition.y : Math.random() * 100 + "%"}
              dur={`${duration}s`}
              repeatCount="indefinite"
              keyTimes="0;0.5;1"
              values={`${interactive ? mousePosition.y : Math.random() * 100 + "%"};${interactive ? mousePosition.y : Math.random() * 100 + "%"};${interactive ? mousePosition.y : Math.random() * 100 + "%"}`}
            />
          </rect>
        </svg>
      ))}
    </div>
  );
};
