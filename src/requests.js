import axios from "axios"

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0'
const CONVERTER_API_URL = 'https://api.getgeoapi.com/v2/currency'

const weatherApiAxios = axios.create({
	baseURL: WEATHER_API_URL
})

const geoApiAxios = axios.create({
	baseURL: GEO_API_URL
})

const currencyApiAxios = axios.create({
	baseURL: CONVERTER_API_URL
})

export {weatherApiAxios, geoApiAxios, currencyApiAxios}
