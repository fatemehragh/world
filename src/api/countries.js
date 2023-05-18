import axios from 'axios';
// constants
import {COUNTRIES_API_URL} from "@/constants/endpoints";

//----------------------------------------------------------------


// Fetch all countries
export const fetchCountriesData = async () => {
    try {
        const response = await axios.get(`${COUNTRIES_API_URL}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries data:', error);
        return null;
    }
};

// Fetch country details by name

export const fetchCountryDetails  = async (name) => {
    try {
        const response = await axios.get(`${COUNTRIES_API_URL}/name/${name}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries data:', error);
        return null;
    }
};

// Fetch country full name by code

export const fetchCountryFullName  = async (name) => {
    try {
        const response = await axios.get(`${COUNTRIES_API_URL}/alpha/${name}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries data:', error);
        return null;
    }
};
