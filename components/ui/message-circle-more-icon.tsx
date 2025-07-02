"use client"
import { MessageCircle } from "lucide-react"
import type { HTMLAttributes } from "react"
import { forwardRef } from "@/lib/utils"
import { cn } from "@/lib/utils"

export interface MessageCircleMoreIconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

interface MessageCircleMoreIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number
}

const MessageCircleMoreIcon = forwardRef<MessageCircleMoreIconHandle, MessageCircleMoreIconProps>(
  ({ className, size = 28, ...props }, ref) => {
    return (
      <div className={cn(className)} {...props}>
        <MessageCircle
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </div>
    )
  },
)

MessageCircleMoreIcon.displayName = "MessageCircleMoreIcon"

export { MessageCircleMoreIcon }
