import React, {useContext} from 'react';
//context
import {ThemeContext} from "../contexts/ThemeContext";
//styles
import styles from '../styles/CountryCard.module.css';

const CountryCard = (props) => {
    const country = props.country;
    const { theme } = useContext(ThemeContext);

    const cardStyle = {
        backgroundColor: theme === 'dark' ? 'var(--dark-blue)' : 'var(--white)',
        color: theme === 'dark' ? 'var(--white)' : 'var(--very-dark-blue-light-text)',
    };

    return (
        <div className={styles['country-card-container']} style={cardStyle}>
            <div>
                <img src={country.flags['svg']} alt={country.flags['alt']}/>
            </div>
            <div>
                <div className={styles['country-card-name']}>
                    {country.name.common}
                </div>
                <div><span>Population: </span> <span>{country['population'].toLocaleString()}</span></div>
                <div><span>Region: </span><span>{country['region']}</span></div>
                <div><span>capital: </span> <span>{country['capital']}</span></div>
            </div>

        </div>
    )
}
export default CountryCard
