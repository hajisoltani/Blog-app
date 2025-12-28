'use client'

const { createContext, useContext, useState, useEffect } = require("react");


const ThemeContext = createContext()

export default function ThemeProvider({ children }) {

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const current = saved || "light";
        setTheme(current);
        document.documentElement.classList.toggle("dark-mode", current === "dark");
    }, []);

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        localStorage.setItem("theme", next);
        document.documentElement.classList.toggle("dark-mode", next === "dark");
    };

    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}

export function useTheme() {
    const context = useContext(ThemeContext)

    return context
}