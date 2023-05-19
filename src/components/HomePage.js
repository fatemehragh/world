import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// API
import { fetchCountriesData } from '@/api/countries';
// components
import CountryCard from './CountryCard';
// utils
import { fuzzySearch } from '@/utils/Search';
// constants
import { regions } from '@/constants/constants';
// styles
import styles from '../styles/Home.module.css';
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '@/contexts/ThemeContext';

//----------------------------------------------------------------

const HomePage = () => {
    const [countriesData, setCountriesData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [sortBy, setSortBy] = useState('');

    const { theme, toggleTheme } = useContext(ThemeContext);

    const headerStyle = {
        backgroundColor:
            theme === 'dark' ? 'var(--dark-blue)' : 'var(--white)',
        color:
            theme === 'dark'
                ? 'var(--white)'
                : 'var(--very-dark-blue-light-text)',
    };

    const inputStyle = {
        backgroundColor:
            theme === 'dark' ? 'var(--dark-blue)' : 'var(--white)',
        placeholdercolor:
            theme === 'dark' ? 'var(--white)' : 'var(--dark-gray)',
    };

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCountriesData();
            setCountriesData(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const { query } = router;
        setSearchTerm(query.searchTerm || '');
        setSelectedRegion(query.selectedRegion || '');
        setSortBy(query.sortBy || '');
    }, [router.query]);

    useEffect(() => {
        const query = {};
        if (searchTerm) {
            query.searchTerm = searchTerm;
        }
        if (selectedRegion) {
            query.selectedRegion = selectedRegion;
        }
        if (sortBy) {
            query.sortBy = sortBy;
        }
        router.push({
            pathname: '/',
            query,
        });
    }, [searchTerm, selectedRegion, sortBy]);

    const filterCountries = (countries, searchTerm, selectedRegion) => {
        if (!countries) {
            return [];
        }
        if (!searchTerm && !selectedRegion) {
            return countries;
        }
        if (!searchTerm && selectedRegion) {
            return countries.filter((country) => {
                const region = country.region.toLowerCase();
                return region === selectedRegion;
            });
        }
        return countries.filter((country) => {
            const name = country.name.common;
            const region = country.region.toLowerCase();
            return (
                fuzzySearch(searchTerm, name) &&
                (selectedRegion === '' || region === selectedRegion)
            );
        });
    };

    const sortCountries = (countries, sortBy) => {
        if (sortBy === 'population') {
            return countries.sort((a, b) => b.population - a.population);
        } else if (sortBy === 'name') {
            return countries.sort((a, b) =>
                a.name.common.localeCompare(b.name.common)
            );
        } else {
            return countries;
        }
    };

    const handleSort = (event) => {
        setSortBy(event.target.value);
    };

    const filteredCountries = filterCountries(
        countriesData,
        searchTerm,
        selectedRegion
    );
    const sortedCountries = sortCountries(filteredCountries, sortBy);

    return (
        <div className={styles['country-home']}>
            <div className={styles['search-container']}>
                <div className={styles['search-input-container']}>
                    <FontAwesomeIcon
                        icon={faSearch}
                        className={styles['search-icon']}
                        style={headerStyle}
                    />
                    <input
                        style={inputStyle}
                        type="text"
                        placeholder="Search for a country..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles['search-input']}
                    />
                </div>
                <div className={styles['select-container']}>
                    <select
                        style={headerStyle}
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className={styles['select']}
                    >
                        <option value="">Filter by Region</option>
                        {regions.map((region) => (
                            <option key={region} value={region.toLowerCase()}>
                                {region}
                            </option>
                        ))}
                    </select>
                    <select
                        style={headerStyle}
                        value={sortBy}
                        onChange={handleSort}
                        className={styles['select']}
                    >
                        <option value="">Sort by</option>
                        <option value="population">Population</option>
                        <option value="name">Name</option>
                    </select>
                </div>
            </div>
            <div className={styles['country-card-container']}>
                {sortedCountries &&
                    sortedCountries.map((country) => (
                        <CountryCard country={country} key={country.alpha3Code} />
                    ))}
            </div>
        </div>
    );
};

export default HomePage;
