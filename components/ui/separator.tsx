"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/utils/utils";

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  children?: React.ReactNode;
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      children,
      orientation = "horizontal",
      decorative = true,
      ...props
    },
    ref
  ) => (
    <>
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border inline-flex items-center justify-center",
          orientation === "horizontal" ? "h-0.5 w-full" : "h-full w-0.5",
          className
        )}
        {...props}
      >
        {!!children && orientation === "vertical" && (
          <div className="h-6 w-0.5 bg-background"></div>
        )}
        {children && (
          <span
            className={cn(
              "absolute left-1/2 -translate-x-1/2  text-sm text-muted-foreground text-nowrap ",
              orientation === "horizontal" ? "px-4 bg-background" : ""
            )}
          >
            {children}
          </span>
        )}
      </SeparatorPrimitive.Root>
    </>
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;


export { Separator };
