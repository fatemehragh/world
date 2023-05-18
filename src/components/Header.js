import {useContext} from 'react';
//context
import {ThemeContext} from "@/contexts/ThemeContext";
//styles
import styles from '../styles/Header.module.css';



//----------------------------------------------------------------

const Header = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);

    const headerStyle = {
        backgroundColor: theme === 'dark' ? 'var(--dark-blue)' : 'var(--white)',
        color: theme === 'dark' ? 'var(--white)' : 'var(--very-dark-blue-light-text)',
    };

    return (
        <header className={`${styles.header} shadow`} style={headerStyle}>
      <span style={{fontWeight: '800'}}>
        Where in the world?
      </span>
            <button onClick={toggleTheme} style={headerStyle}>
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </button>
        </header>
    );
}

export default Header;
