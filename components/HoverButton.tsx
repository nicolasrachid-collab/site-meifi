"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface HoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const HoverButton = React.forwardRef<HTMLButtonElement, HoverButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative px-8 py-3 rounded-full",
          "text-[#08131A] font-medium text-lg leading-6",
          "bg-white",
          "cursor-pointer",
          "shadow-lg",
          "transition-transform duration-300",
          "active:scale-[0.975]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

HoverButton.displayName = "HoverButton";

export { HoverButton };

