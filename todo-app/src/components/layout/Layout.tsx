import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/Button";
import { useDarkMode } from "../../hooks/useDarkMode";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const { theme, toggleTheme } = useDarkMode();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold tracking-tight">Todo App</h1>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? (
                            <Moon className="h-5 w-5" />
                        ) : (
                            <Sun className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
