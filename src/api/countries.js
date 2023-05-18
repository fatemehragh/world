import axios from 'axios';
// constants
import {COUNTRIES_API_URL} from "../constants/endpoints";


// Fetch all countries
export const fetchCountriesData = async () => {
    try {
        const response = await axios.get(`${COUNTRIES_API_URL}/v3.1/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries data:', error);
        return null;
    }
};

// Fetch country by fullName

export const fetchCountryDetails  = async (name) => {
    try {
        const response = await axios.get(`${COUNTRIES_API_URL}/v3.1/name/${name}?fullText=true`);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries data:', error);
        return null;
    }
};
