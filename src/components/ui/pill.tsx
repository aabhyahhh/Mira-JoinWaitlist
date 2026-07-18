import * as React from "react";

import { cn } from "@/lib/utils";

export interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

const Pill = React.forwardRef<HTMLButtonElement, PillProps>(
  ({ className, selected, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        ref={ref}
        aria-pressed={selected}
        className={cn(
          "min-h-[3rem] rounded-2xl border-2 px-5 py-3 text-[15px] font-medium leading-snug transition-all active:scale-[0.97]",
          selected
            ? "border-primary bg-primary text-primary-foreground shadow-sm"
            : "border-input bg-card text-charcoal-700 hover:border-coral-300 hover:bg-coral-50",
          className
        )}
        {...props}
      />
    );
  }
);
Pill.displayName = "Pill";

export { Pill };
