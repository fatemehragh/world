import { useContext, useEffect } from "react";
// components
import HomePage from "../src/components/HomePage";
// contexts
import { ThemeContext } from "@/contexts/ThemeContext";

//----------------------------------------------------------------

export default function Home() {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
    }, [theme]);

    return (
        <>
            <HomePage />
        </>
    );
}
