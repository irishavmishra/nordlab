"use client";

import React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

const toastConfig: Record<ToastType, { icon: React.ReactNode; className: string }> = {
  success: {
    icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    className: "border-l-emerald-400",
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-red-400" />,
    className: "border-l-red-400",
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
    className: "border-l-yellow-400",
  },
  info: {
    icon: <Info className="w-5 h-5 text-blue-400" />,
    className: "border-l-blue-400",
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {children}
      <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 w-96 max-w-[100vw] p-4 outline-none" />
    </ToastPrimitive.Provider>
  );
}

export function Toast({
  open,
  onOpenChange,
  type = "info",
  title,
  description,
  duration = 5000,
}: ToastProps) {
  const config = toastConfig[type];

  return (
    <ToastPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      duration={duration}
      className={cn(
        "group relative flex items-start gap-3 w-full p-4 bg-charcoal border border-slate-dark border-l-2 rounded-lg shadow-xl",
        "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
        "data-[swipe=cancel]:translate-x-0",
        "data-[swipe=end]:animate-out data-[state=closed]:animate-out",
        "data-[state=open]:animate-in data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-bottom-full",
        config.className
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
      <div className="flex-1 min-w-0">
        <ToastPrimitive.Title className="text-sm font-medium text-cream">
          {title}
        </ToastPrimitive.Title>
        {description && (
          <ToastPrimitive.Description className="mt-1 text-sm text-warm-gray">
            {description}
          </ToastPrimitive.Description>
        )}
      </div>
      <ToastPrimitive.Close className="flex-shrink-0 p-1 text-warm-gray hover:text-cream transition-colors rounded focus:outline-none focus:ring-2 focus:ring-copper">
        <X className="w-4 h-4" />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
}
