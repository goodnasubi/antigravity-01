import { useEffect, useState } from "react";

export function useDarkMode() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const storedPrefs = window.localStorage.getItem("theme");
            if (typeof storedPrefs === "string") {
                return storedPrefs as "light" | "dark";
            }
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                return "dark";
            }
        }
        return "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return { theme, toggleTheme };
}
