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
    const {theme, toggleTheme} = useContext(ThemeContext);

    const headerStyle = {
        backgroundColor: theme === 'dark' ? 'var(--dark-blue)' : 'var(--white)',
        color: theme === 'dark' ? 'var(--white)' : 'var(--very-dark-blue-light-text)',
    };

    return (
        <header className={`${styles.header} shadow`} style={headerStyle}>
            <Link href="/">
                <span style={{fontWeight: '800'}}>
        Where in the world ?
      </span>
            </Link>
            <button onClick={toggleTheme} style={headerStyle}>
                <FontAwesomeIcon
                    icon={faMoon}
                    style={headerStyle}
                />
                {theme === 'dark' ? '  Dark Mode' : '  Light Mode'}
            </button>
        </header>
    );
}

export default Header;
