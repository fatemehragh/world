import {useContext, useEffect, useState} from 'react';
//context
import {ThemeContext} from "../contexts/ThemeContext";
//styles
import styles from '../styles/Header.module.css';

const Header = () => {
    const { toggleTheme } = useContext(ThemeContext);

    return (
        <header className={`${styles.header}`}>
            <span style={{fontWeight: '800'}}>
                Where in the world?
            </span>
            <button onClick={toggleTheme}>
                jo;;j
            </button>
        </header>
    );
}

export default Header;
