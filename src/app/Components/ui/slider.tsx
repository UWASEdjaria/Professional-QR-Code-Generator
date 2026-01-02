import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  className?: string;
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value = [0], onValueChange, min = 0, max = 100, step = 1, disabled, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = [parseInt(e.target.value)];
      onValueChange?.(newValue);
    };

    return (
      <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleChange}
          disabled={disabled}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
