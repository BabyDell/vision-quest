"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative w-full h-1 overflow-hidden rounded-full border border-slate-400", // Increased height to 8
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full flex-1 transition-all bg-emerald-700"
      style={{ width: `${value}%` }} // Adjusted to use width for progress
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }