import {useContext} from 'react';
//context
import {ThemeContext} from "@/contexts/ThemeContext";
// Next
import Link from 'next/link';
//styles
import styles from '../styles/Header.module.css';
//Icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faMoon
} from "@fortawesome/free-solid-svg-icons";
//----------------------------------------------------------------

const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header className={`${styles.header} shadow`}>
            <Link href="/">
                <span style={{ fontWeight: "800" }}>Where in the world?</span>
            </Link>
            <button onClick={toggleTheme}>
                <FontAwesomeIcon icon={faMoon} />
                {theme === "dark" ? " Dark Mode" : " Light Mode"}
            </button>
        </header>
    );
};

export default Header;
