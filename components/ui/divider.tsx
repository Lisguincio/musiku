"use client";
import { cn } from "@/utils/utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

export interface DividerProps
  extends React.ButtonHTMLAttributes<HTMLHRElement> {
  asChild?: boolean;
  orientation: "horizontal" | "vertical";
  text?: React.ReactNode;
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation, text, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "hr";
    return (
      <div className="relative flex w-full justify-center items-center ">
        <Comp
          ref={ref}
          className={cn(
            "bg-foreground/10",
            { horizontal: "w-full h-[1px]", vertical: "h-full w-[1px]" }[
              orientation
            ]
          )}
          {...props}
        ></Comp>
        <div className="absolute flex inset-0 items-center justify-center text-xs">
          {text}
        </div>
      </div>
    );
  }
);
Divider.displayName = "Divider";

export default Divider;
