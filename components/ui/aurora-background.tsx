"use client";
import { cn } from "@/lib/utils";
import React from "react";
 
interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  showRadialGradient?: boolean;
}
 
export const AuroraBackground = ({
  children,
  showRadialGradient = true,
  className,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900  text-slate-950 transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          //   @ts-ignore
          style={{
            filter: "url(#f1) blur(100px)",
            // filter: "blur(100px)",
          }}
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter: blur(100px) invert(0);
            
            after:content-[""] after:absolute after:inset-0 after:bg-background/20 after:dark:bg-transparent after:z-50
            before:content-[""] before:absolute before:inset-0 before:bg-background/20 before:dark:bg-transparent before:z-50
            
            
            
            
            
            
            
            
            
            absolute -inset-px opacity-50 will-change-transform`,
            `
            [animation:aurora_4s_linear_infinite]
            [animation-fill-mode:forwards]
            [animation-direction:alternate]
            `
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};
