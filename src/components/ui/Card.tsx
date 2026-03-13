import { cn } from "@/lib/utils";
import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: boolean;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, padding = true, hover = false, className, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-surface-warm bg-white",
          padding && "p-5",
          hover && "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-midnight/5",
          onClick && "cursor-pointer",
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card, type CardProps };
