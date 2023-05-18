import React, {useEffect, useState} from 'react';
// API
import {fetchCountriesData} from '@/api/countries';
// components
import CountryCard from "./CountryCard";
// utils
import {fuzzySearch} from "@/utils/Search";
// constants
import {regions} from "@/constants/constants";
// styles
import styles from '../styles/Home.module.css';

//----------------------------------------------------------------


const HomePage = () => {
    const [countriesData, setCountriesData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCountriesData();
            setCountriesData(data);
        };

        fetchData();
    }, []);

    const filterCountries = (countries, searchTerm, selectedRegion) => {
        if (!searchTerm && !selectedRegion) {
            return countries;
        }
        if (!searchTerm && selectedRegion) {
            return countries.filter((country) => {
                const region = country.region.toLowerCase();
                return (region === selectedRegion);
            });
        }
        return countries.filter((country) => {
            const name = country.name.common;
            const region = country.region.toLowerCase();
            return fuzzySearch(searchTerm, name) && (selectedRegion === '' || region === selectedRegion);
        });
    };

    const sortCountries = (countries, sortBy) => {
        if (sortBy === 'population') {
            return countries.sort((a, b) => b.population - a.population);
        } else if (sortBy === 'name') {
            return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        } else {
            return countries;
        }
    };

    const handleSort = (event) => {
        setSortBy(event.target.value);
    };


    const filteredCountries = filterCountries(countriesData, searchTerm, selectedRegion);
    const sortedCountries = sortCountries(filteredCountries, sortBy);

    return (
        <div className={styles['country-home']}>
            <div>
                <input
                    type="text"
                    placeholder="Search for a country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                    <option value="">Filter by Region</option>
                    {regions.map((region) => (
                        <option key={region} value={region.toLowerCase()}>{region}</option>
                    ))}
                </select>
                <select value={sortBy} onChange={handleSort}>
                    <option value="">Sort by</option>
                    <option value="population">Population</option>
                    <option value="name">Name</option>
                </select>
            </div>
            {sortedCountries && sortedCountries.map((country) => (
                <CountryCard country={country}/>
            ))}
        </div>
    )
}

export default HomePage;
