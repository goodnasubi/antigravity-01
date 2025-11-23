import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700":
                            variant === "default",
                        "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700":
                            variant === "secondary",
                        "bg-red-500 text-white hover:bg-red-600 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90":
                            variant === "destructive",
                        "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50":
                            variant === "outline",
                        "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50":
                            variant === "ghost",
                        "h-10 px-4 py-2": size === "default",
                        "h-9 rounded-md px-3": size === "sm",
                        "h-11 rounded-md px-8": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
