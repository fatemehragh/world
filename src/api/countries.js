import axios from 'axios';
// constants
import {COUNTRIES_API_URL} from "../constants/endpoints";

const fetchCountriesData = async () => {
    try {
        const response = await axios.get(COUNTRIES_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries data:', error);
        return null;
    }
};

export default fetchCountriesData;
