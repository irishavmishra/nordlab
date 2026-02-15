import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-charcoal to-obsidian border border-slate-dark rounded-lg overflow-hidden transition-all duration-300 hover:border-copper/50",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-b border-slate-dark",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardBody({ className, children }: CardBodyProps) {
  return (
    <div className={cn("px-6 py-4", className)}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-t border-slate-dark bg-graphite/30",
        className
      )}
    >
      {children}
    </div>
  );
}
