import React from "react"
import { cn } from "@/lib/utils"

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline"
}

export function RainbowButton({ children, className, variant = "default", ...props }: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "gradient-button",
        "relative inline-flex items-center justify-center overflow-hidden rounded-xl p-px font-medium text-white transition-all duration-300 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
        variant === "outline" && "gradient-button-variant",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center rounded-xl bg-slate-900 px-6 py-3 transition-all duration-300 ease-in-out",
          "group-hover:bg-opacity-0",
          variant === "outline" && "bg-transparent text-slate-800 dark:text-slate-200",
        )}
      >
        {children}
      </span>
    </button>
  )
}
