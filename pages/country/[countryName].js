import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {fetchCountryDetails} from '@/api/countries';

const CountryPage = () => {
    const router = useRouter();
    const {countryName} = router.query;
    const [country, setCountry] = useState(null);

    useEffect(() => {
        const fetchCountry = async () => {
            const data = await fetchCountryDetails(countryName);
            console.log(data)
            setCountry(data[0]);
        };

        if (countryName) {
            fetchCountry();
        }
    }, [countryName]);

    if (!country) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Population: {country.population}</div>
            <div>Region: {country.region}</div>
            <div>Capital: {country.capital}</div>
            {/* Render other country details here */}
        </div>
    );
};

export default CountryPage;
