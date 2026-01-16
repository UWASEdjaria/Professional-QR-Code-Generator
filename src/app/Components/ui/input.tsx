import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const classes = [
      "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600",
      "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    ].filter(Boolean).join(' ');
    
    return (
      <input
        type={type}
        className={classes}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
