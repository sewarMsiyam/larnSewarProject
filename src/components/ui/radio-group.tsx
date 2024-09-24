"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-4 lg:gap-8 grid-cols-1 lg:grid-cols-3 ", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
       className={cn(
        "relative flex items-center justify-between p-4 ps-10 ring-1 rounded-2xl ring-gray-300 transition-colors focus:outline-none focus-visible:ring-0 w-full", 
        "data-[state=checked]:ring-1 data-[state=checked]:ring-primary data-[state=checked]:bg-[#0ABC8C1A] border-transparent ",
      )}
      {...props}
    >
      {children}
      <div className="absolute top-[18px] right-4 flex items-center justify-center">
        <Circle className="h-5 w-5 fill-none text-gray-300" />
        <RadioGroupPrimitive.Indicator className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-primary rounded-full shadow">
          <Circle className="h-5 w-2 fill-white text-primary" />
        </RadioGroupPrimitive.Indicator>
      </div>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem }
