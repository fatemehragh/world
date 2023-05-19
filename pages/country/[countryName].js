import {useContext, useEffect, useState} from 'react';
// Next
import { useRouter } from 'next/router';
import Image from 'next/image';
// Api
import {fetchCountryDetails, fetchCountryFullName} from '@/api/countries';
// Components
import {Loading} from "@/components/Loading";
// Styles
import styles from '../../src/styles/CountryPage.module.css';
// Context
import {ThemeContext} from "@/contexts/ThemeContext";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft, faMoon
} from "@fortawesome/free-solid-svg-icons";


//----------------------------------------------------------------

const CountryPage = () => {
    const router = useRouter();
    const { countryName } = router.query;
    const [country, setCountry] = useState(null);
    const [borderNames, setBorderNames] = useState([]);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
    }, [theme]);

    const themeStyle = {
        backgroundColor: theme === 'dark' ? 'var(--dark-blue)' : 'var(--white)',
        color: theme === 'dark' ? 'var(--very-light-gray)' : 'var(--very-dark-blue-light-text)',
    };

    useEffect(() => {
        const fetchCountry = async () => {
            const data = await fetchCountryDetails(countryName);
            setCountry(data[0]);
        };

        if (countryName) {
            fetchCountry();
        }
    }, [countryName]);

    useEffect(() => {
        const fetchBorderNames = async () => {
            if (country && country.borders) {
                const names = await Promise.all(
                    country.borders.map(async (border) => {
                        const response = await fetchCountryFullName(border);
                        console.log(response)
                        return response[0].name.common;

                    })
                );
                setBorderNames(names);
            }
        };

        if (country) {
            fetchBorderNames();
        }
    }, [country]);

    if (!country) {
        return <Loading/>;
    }

    const handleBackClick = () => {
        router.back();
    };

    const handleBorderClick = (border, fullName) => {
        router.push(`/country/${border}`, `/country/${fullName}`);
    };

    //helper functions

    const getNativeName = (nativeName) => {
        const keys = Object.keys(nativeName);
        const firstKey = keys[0];
        return nativeName[firstKey].common;
    };

    const getLanguages = (languages) => {
        return Object.values(languages);
    };

    const getCurrencies = (currenciesList) => {
        const currencies = Object.values(currenciesList);
        return currencies.map((currency) => currency.name);
    };


    const getBorderCountries = () => {
        if (borderNames.length === 0) {
            return <div>No border countries found.</div>;
        }

        return (
            <div className={styles['border-countries']}>
                <div><span>Border Countries:</span></div>
                <div className={styles['buttons']}>
                    {country.borders.map((border, index) => (
                        <button style={themeStyle} className={styles['back-button']} key={border} onClick={() => handleBorderClick(border, borderNames[index])}>
                            {borderNames[index]}
                        </button>
                    ))}
                </div>
            </div>
        );
    };
    return (
        <div style={{margin: '50px 70px'}}>
            <div className={styles['back-button-container']}>
                <button style={themeStyle} className={styles['back-button']} onClick={handleBackClick}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                    />
                    <span>
                    Back
                </span>

                </button>
            </div>

            <div className={styles['country-detail-container']}>
                <div className={styles['image-container']}>
                    <div className={styles['image-wrapper']}>
                        <Image
                            src={country.flags['svg']}
                            alt={country.flags['alt']}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
                <div style={themeStyle} className={styles['details-container']} >
                    <h2>{country.name.common}</h2>
                    <div className={styles['details-wrapper']}>
                        <div className={styles['details-column']}>
                            <div><span>Native Name:</span> <span>{getNativeName(country.name.nativeName)}</span></div>
                            <div><span>Population:</span> <span>{country['population'].toLocaleString()}</span></div>
                            <div><span>Region:</span><span>{country.region}</span> </div>
                            <div><span>Sub Region:</span> <span>{country.subregion}</span></div>
                            <div><span>Capital:</span> <span>{country.capital}</span></div>
                        </div>
                        <div className={styles['details-column']}>
                            <div><span>Top Level Domain:</span><span>{country.tld}</span> </div>
                            <div><span>Currencies:</span> <span>{getCurrencies(country.currencies)}</span></div>
                            <div><span>Languages:</span> <span>{getLanguages(country.languages)}</span></div>
                        </div>
                    </div>
                        {getBorderCountries()}
                </div>

            </div>
        </div>
    );
};

export default CountryPage;
