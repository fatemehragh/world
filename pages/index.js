import HomePage from '../src/components/HomePage';
import {ThemeContext} from "@/contexts/ThemeContext";
import {useContext, useEffect} from "react";

export default function Home() {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        console.log(theme)
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
    }, [theme]);
    return (
        <div>
            <HomePage />
        </div>
    );
}
