"use client";

import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ value, onValueChange, placeholder = "Select...", disabled, className, children }, _ref) => {
    return (
      <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          className={cn(
            "flex items-center justify-between w-full px-4 py-2.5 bg-charcoal border border-slate-dark rounded text-cream text-sm transition-all duration-300",
            "focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "data-[placeholder]:text-warm-gray/50",
            className
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDown className="w-4 h-4 text-warm-gray" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="overflow-hidden bg-charcoal border border-slate-dark rounded shadow-xl z-50"
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-6 bg-charcoal text-cream cursor-default">
              <ChevronUp className="w-4 h-4" />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="p-1">
              {children}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-6 bg-charcoal text-cream cursor-default">
              <ChevronDown className="w-4 h-4" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  }
);
Select.displayName = "Select";

function SelectItem({ value, children, disabled }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      value={value}
      disabled={disabled}
      className={cn(
        "relative flex items-center px-8 py-2 text-sm text-cream rounded cursor-pointer select-none",
        "focus:outline-none focus:bg-graphite",
        "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
        "data-[highlighted]:bg-graphite"
      )}
    >
      <SelectPrimitive.ItemIndicator className="absolute left-2 flex items-center justify-center">
        <Check className="w-4 h-4 text-copper" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectItem };
