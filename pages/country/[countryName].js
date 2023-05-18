import { useEffect, useState } from 'react';
// Next
import { useRouter } from 'next/router';
import Image from 'next/image';
// Api
import {fetchCountryDetails, fetchCountryFullName} from '@/api/countries';
// Components
import {Loading} from "@/components/Loading";

//----------------------------------------------------------------

const CountryPage = () => {
    const router = useRouter();
    const { countryName } = router.query;
    const [country, setCountry] = useState(null);
    const [borderNames, setBorderNames] = useState([]);

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

console.log(country)
    return (
        <>
            <button onClick={handleBackClick}>Back</button>

            <div>
                <Image
                    src={country.flags['svg']}
                    alt={country.flags['alt']}
                    width={150}
                    height={100}
                />
            </div>
            <h1>{country.name.common}</h1>
            <div>Native Name: {getNativeName(country.name.nativeName)}</div>
            <div>Population: {country['population'].toLocaleString()}</div>
            <div>Region: {country.region}</div>
            <div>Sub Region: {country.subregion}</div>
            <div>Capital: {country.capital}</div>
            <div>Top Level Domain: {country.tld}</div>
            <div>Currencies: {getCurrencies(country.currencies)}</div>
            <div>Languages: {getLanguages(country.languages)}</div>
            <div>border countries:</div>
            <ul>
                {country.borders && country.borders.map((border, index) => (
                    <li key={border}>
                        <button onClick={() => handleBorderClick(border, borderNames[index])}>
                            {borderNames[index]}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default CountryPage;
