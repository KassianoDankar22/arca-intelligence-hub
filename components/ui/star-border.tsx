import React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

interface StarBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  color?: string
  as?: React.ElementType
}

export function StarBorder({ children, className, color = "#000", as: Comp = "div", ...props }: StarBorderProps) {
  return (
    <Comp
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-xl p-px font-medium text-white transition-all duration-300 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
        className,
      )}
      style={
        {
          "--star-color": color,
        } as React.CSSProperties
      }
      {...props}
    >
      <span
        className={cn(
          "absolute inset-0 z-0",
          "bg-[radial-gradient(circle_at_center,_var(--star-color)_0%,_transparent_70%)]",
          "opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          "animate-star-pulse",
        )}
      />
      <span
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center rounded-xl bg-slate-900 px-6 py-3 transition-all duration-300 ease-in-out",
          "group-hover:bg-opacity-0",
        )}
      >
        {children}
      </span>
    </Comp>
  )
}
