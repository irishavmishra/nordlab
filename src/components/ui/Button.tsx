import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-br from-copper to-copper-dark text-obsidian shadow-[0_4px_24px_-4px_rgba(201,145,90,0.4)] hover:shadow-[0_8px_32px_-4px_rgba(201,145,90,0.5)] hover:-translate-y-0.5",
  secondary:
    "bg-transparent border border-slate-mid text-cream hover:border-copper hover:text-copper-light hover:-translate-y-px",
  danger:
    "bg-gradient-to-br from-red-600 to-red-700 text-white shadow-[0_4px_24px_-4px_rgba(220,38,38,0.4)] hover:shadow-[0_8px_32px_-4px_rgba(220,38,38,0.5)] hover:-translate-y-0.5",
  success:
    "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-[0_4px_24px_-4px_rgba(5,150,105,0.4)] hover:shadow-[0_8px_32px_-4px_rgba(5,150,105,0.5)] hover:-translate-y-0.5",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded transition-all duration-300 focus-visible:outline-2 focus-visible:outline-copper-light focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
