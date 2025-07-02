"use client"

import React from "react"
import { cn } from "@/lib/utils"

export const BeamsBackground = React.memo(({ className }: { className?: string }) => {
  return <div className={cn("absolute inset-0 bg-slate-950", className)} />
})

BeamsBackground.displayName = "BeamsBackground"
