import axios from 'axios';
import { CONVERTER_API_URL, GEO_API_URL, WEATHER_API_URL } from './constants';

const weatherApiAxios = axios.create({
  baseURL: WEATHER_API_URL,
});

const geoApiAxios = axios.create({
  baseURL: GEO_API_URL,
});

const currencyApiAxios = axios.create({
  baseURL: CONVERTER_API_URL,
});

export { weatherApiAxios, geoApiAxios, currencyApiAxios };
