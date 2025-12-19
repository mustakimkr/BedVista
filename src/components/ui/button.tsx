import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "ghost";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", type = "button", ...props }, ref) => {
    const styles: Record<ButtonVariant, string> = {
      default:
        "bg-[linear-gradient(120deg,#ffffff,#dcdcdc,#ffffff)] text-black hover:brightness-110 active:brightness-95 focus-visible:ring-white focus-visible:ring-offset-black animate-gradient",
      ghost:
        "border border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/5 focus-visible:ring-white/70 focus-visible:ring-offset-black",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
          styles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
