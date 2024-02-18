import '../Components/Main.scss'
import './Weather.scss'
import { weatherApiAxios, geoApiAxios } from '../../requests'
import * as moment from 'moment'
import React, { useState, useEffect, useRef } from 'react'
import { Loader } from '../Components/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMagnifyingGlassLocation,  
	faCalendarDays, 
	faLocationDot,
	faLocationCrosshairs,
	faWind,
	faSun,
	faTemperatureHigh,
	faArrowsDownToLine,
	faEye,
	faDroplet,
	faLocationArrow,
	faCircle,
	faMoon,
	faCloudSun,
	faCloudMoon,
	faCloud,
	faCloudShowersHeavy,
	faCloudSunRain,
	faCloudMoonRain,
	faCloudBolt,
	faSnowflake,
	faCloudMeatball,
	faSmog,
	faCloudRain
} from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import Slider from 'infinite-react-carousel';
import SunCalc from "suncalc";
import {useScreenResize} from "../../helper";
import {
	LatAndLoneType,
	WeatherIcon,
	StyleChangeIcon,
	WeatherDateOptions,
	WeatherGeoItem,
	WeatherSliderSettings,
	ApiResponseType,
	CurrentWeather,
	AirPollutionIndex,
	ForecastWeather,
	ForecastWeatherListItem,
	AirIndexInfo,
} from "../../types";

const weatherIconArr = [
	{
		name: 'thunderstorm',
		icon: faCloudBolt,
		color: '#FBCE02',
		idArr: [
			200,	
			201,	
			202,	
			210,	
			211,	
			212,	
			221,	
			230,	
			231,	
			232
		]
	},
	{
		name: 'drizzle',
		icon: faCloudRain,
		color: '#B1B7BA',
		idArr: [
			300, 
			301, 
			302, 
			310, 
			311, 	
			312, 
			313, 
			314,  
			321 
		]
	},
	{
		name: 'rain',
		timeStyleChange: {
			day: {
				icon: faCloudSunRain,
				color: '#83c1e8'
			},
			night: {
				icon: faCloudMoonRain,
				color: '#20204d'
			}
		},
		idArr: [
			500,
			501,
			502,
			503,
			504
		]
	},
	{
		name: 'rainSnow',
		icon: faCloudMeatball,
		color: '#c1e3ff',
		idArr: [
			511
		]
	},
	{
		name: 'rainCloud',
		icon: faCloudShowersHeavy,
		color: '#193f6e',
		idArr: [
			520,
			521,
			522,
			531
		]
	},
	{
		name: 'snow',
		icon: faSnowflake,
		color: '#e1ebec',
		idArr: [
			600,	
			601,	
			602,	
			611,	
			612,	
			613,
			615,	
			616,
			620,	
			621,
			622
		]
	},
	{
		name: 'atmosphere',
		icon: faSmog,
		color: '#c2c5cb',
		idArr: [
			701,	
			711,	
			721,	
			731,	
			741,	
			751,	
			761,
			762,	
			771,	
			781
		]
	},
	{
		name: 'clear',
		timeStyleChange: {
			day: {
				icon: faCircle,
				color: '#FBCE02'
			},
			night: {
				icon: faMoon,
				color: '#f1eaca'
			}
		},
		idArr: [
			800
		]
	},
	{
		name: 'fewClouds',
		timeStyleChange: {
			day: {
				icon: faCloudSun,
				color: '#FAD074'
			},
			night: {
				icon: faCloudMoon,
				color: '#272727'
			}
		},
		idArr: [
			801
		]
	},
	{
		name: 'clouds',
		icon: faCloud,
		color: '#f9f9f7',
		idArr: [
			802,
			803,
			804
		]
	},
]

const airIndexBgColor = [
	{
		label: 'Good',
		color: '#058240'
	},
	{
		label: 'Fair',
		color: '#637713'
	},
	{
		label: 'Moderate',
		color: '#f3b800'	
	},
	{
		label: 'Poor',
		color: '#EE9B01'
	},
	{
		label: 'Very Poor',
		color: '#BC0000'
	},
]

const airIndexInfo = [
	{
		label: 'PM2.5',
		name: 'pm2_5'
	},
	{
		label: 'SO2',
		name: 'so2'
	},
	{
		label: 'NO2',
		name: 'no2'
	},
	{
		label: 'O3',
		name: 'o3'
	}
]

const apiKey = '00cf10c3137056d7ada001eac2f8b7f6'

const Weather = () => {

	const dropDownRef = useRef<any>();

	const currentLat: string | null = localStorage.getItem('currentLat');
	const currentLon: string | null = localStorage.getItem('currentLon');

	const windowWidth: number = useScreenResize()

	const [currentWeather, setCurrentWeather] = useState<ApiResponseType<CurrentWeather>>(null)
	const [geo, setGeo] = useState<ApiResponseType<WeatherGeoItem[]>>(null)
	const [airPollution, setAirPollution] = useState<ApiResponseType<AirPollutionIndex>>(null)
	const [forecastWeather, setForecastWeather] = useState<ApiResponseType<ForecastWeather>>(null)
	const [soonW, setSoonW] = useState<ForecastWeatherListItem[]>([])
	const [fiveDayForecast, setFiveDayForecast] = useState<ForecastWeatherListItem[]>([])
	const [focused, setFocused] = useState<boolean>(false)
	const [placeNameValue, setPlaceNameValue] = useState<string>('')
	const [airIndexInfoFull, setAirIndexInfoFull] = useState<AirIndexInfo[]>([])
	const [lat, setLat] = useState<LatAndLoneType>(currentLat ? currentLat : '50.4500336')
	const [lon, setLon] = useState<LatAndLoneType>(currentLon ? currentLon : '30.5241361')
	
	const dateToday: Date = moment.default().toDate();
	const todayOptions: WeatherDateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
	const forecastMonth : WeatherDateOptions = {  day: 'numeric', month: 'short'}
	const forecastWeekday: WeatherDateOptions = { weekday: 'short' }
	const timeNow: string = moment.default().format('HH:MM')

	const searchActiveWidth : string = windowWidth > 1200 ? '25%' : '40%'

	const sliderSettings : WeatherSliderSettings =  {
      arrows: false,
      arrowsBlock: false,
      autoplay: true,
      autoplaySpeed: 4000,
      dots: true,
      duration: 300,
      dotsScroll: windowWidth < 500 ? 2 : 3,
      slidesToShow: windowWidth < 500 ? 2 : 3
    };

	const weatherAPI = async () => {
		try {
		    const resCurrencyWeather = await weatherApiAxios.get(`/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
		    const resForecast = await weatherApiAxios.get(`/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
		    const resAir = await weatherApiAxios.get(`/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)

			console.log(resCurrencyWeather)

		    return (
		    	setCurrentWeather([resCurrencyWeather.data][0]),
				setForecastWeather([resForecast.data][0]),
		    	setAirPollution([resAir.data][0])
		    )
		  } catch (err) {
		    console.error(err.toJSON())
		  }
	}

	const geoAPI = async () => {
		try {
		    const resGeo = await geoApiAxios.get(`/direct?q=${placeNameValue ? placeNameValue : ' '}&limit=5&appid=${apiKey}`)
		    
		    return (
		    	setGeo([resGeo.data][0])
		    )
		  } catch (err) {
		    console.error(err.toJSON())
		  }
	}

	const onFocus = () => setFocused(true)
	const onBlur = () => setFocused(false)

	const inputHandler = () => (event : React.ChangeEvent<HTMLInputElement>): void => {
		setPlaceNameValue(event.target.value)
	}

	const placeSelectHandler = (item : WeatherGeoItem) => () : void => {
		setLat(item.lat)
		setLon(item.lon)
		setPlaceNameValue('')
		onBlur()
	}

	const date = (lang : string, opt: WeatherDateOptions, day : null | string = null) : string => {

		const dataForecast : Date = moment.default(day).toDate()

		if (day) {
			return dataForecast.toLocaleString(lang, opt);
		} else {
			return dateToday.toLocaleString(lang, opt);
		}
	}

	const letterToUpperCase = (str : string) => (
		str.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')
	)

	const sunSetAndSunRise = (state : string, lat : LatAndLoneType, lon : LatAndLoneType): string => {
		const times: SunCalc.GetTimesResult = SunCalc.getTimes(moment.default().toDate(), +lat, +lon);
		const sunriseStr: string = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
		const sunsetStr: string = times.sunset.getHours() + ':' + times.sunset.getMinutes();

		if (state === 'sunrise') {
			return sunriseStr
		} else {
			return sunsetStr
		}
	}

	const getCurrentLocatin = () => () : void => {
		navigator.geolocation.getCurrentPosition((position) => {
      		setLat(position.coords.latitude);
      		setLon(position.coords.longitude);

      		localStorage.setItem('currentLat', position.coords.latitude + '');
      		localStorage.setItem('currentLon', position.coords.longitude + '');
   		 });
	}

	const weatherIcon = (id : number, time : string): StyleChangeIcon | WeatherIcon => {

		const sunR: moment.Moment = moment.default(sunSetAndSunRise('sunrise', lat, lon), "HH:mm");
		const sunS: moment.Moment = moment.default(sunSetAndSunRise('sunset', lat, lon), "HH:mm");
		const currentTime: moment.Moment = moment.default(time, "HH:mm");

		const selectedIcon: WeatherIcon = weatherIconArr.filter((item: WeatherIcon) => item?.idArr?.includes(id) ? item : null)[0]

		if (selectedIcon.timeStyleChange) {
			if (currentTime >= sunR && currentTime < sunS) {
				return selectedIcon.timeStyleChange.day
			} else return selectedIcon.timeStyleChange.night
		} else return selectedIcon
	
	}

	useEffect(() => {
		weatherAPI()
	}, [lat, lon])

	useEffect(() => {
		geoAPI()
	}, [placeNameValue])

	useEffect(() => {
		if (forecastWeather) {
			const list: ForecastWeatherListItem[] = forecastWeather.list
			
			setSoonW(list.filter((item: ForecastWeatherListItem, index : number) => index < 8))

			const fiveDayArrFinder: ForecastWeatherListItem[] = list.map((item : ForecastWeatherListItem) => {
				return {
					...item,
					data: moment.default(item.dt_txt.slice(0, 10)).format('L')
				}
			})

			setFiveDayForecast(
				fiveDayArrFinder.reverse().filter((elm : ForecastWeatherListItem, id: number) => (
					fiveDayArrFinder.findIndex((item : ForecastWeatherListItem) => {
						if (moment.default().format('L') !== item.data) {
							return item.data === elm.data
						}
					}) === id)
				).reverse()
			)
		}



	}, [forecastWeather])

	useEffect(()=> {
		if (airPollution) {
			setAirIndexInfoFull(airIndexInfo.map((item : AirIndexInfo) => {
				return {
					...item,
					value: airPollution.list[0].components[item.name]
				}
			}))
		}

	}, [airPollution])

	useEffect(()=> {
		const handleClickOutside = (event : MouseEvent): void => {
			if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
				onBlur()
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => document.removeEventListener('click', handleClickOutside)

	}, [])

	return currentWeather && forecastWeather && airPollution && geo && soonW.length ?
		 (
			<div className="mainContainerContent">
				<div className="weatherContainer">
					<div className="searchContainer">
						<div 
							style={focused ? {width: searchActiveWidth} : {}} 
							ref={dropDownRef}
						>
							<input 
								placeholder="Search..." 
								onFocus={onFocus} 
								value={placeNameValue}
								className={focused && placeNameValue ? "searchInput searchInputActive" : "searchInput"}
								onChange={inputHandler()}
							/>
							<FontAwesomeIcon className={focused && placeNameValue ? 'searchAnimation' : ''} icon={faMagnifyingGlassLocation}/>
							<div className={focused && placeNameValue ? "dropDownMenuActive" : "dropDownMenuNone"}>
								{geo.length ? (
									geo.map((item : WeatherGeoItem) => (
										<div 
											className="dropDownMenuPlaces"
											onClick={placeSelectHandler(item)}
										>
											<FontAwesomeIcon icon={faLocationDot}/>
											<span>{item.country}, {item.name}, {item.state}</span>
										</div>
									))
								) : (
									<div className="dropDownMenuPlaces">
										<span>No results</span>
									</div>
								)}
							</div>
						</div>
						<div 
							className="currentLocatin"
							onClick={getCurrentLocatin()}
						>
							<FontAwesomeIcon icon={faLocationCrosshairs}/>
						</div>
					</div>
					<div className="weatherInfoContainer">
						<div>
							<div className="nowWeatherContainer">
								<div>
									<div className="nowWeatherTopContainer">
										<div>Now</div>
										<div>
											<div>
												{Math.floor(currentWeather.main.temp)}
												<span>°C</span>
											</div>
											<div>
												<FontAwesomeIcon
													style={{color: weatherIcon(currentWeather.weather[0].id, timeNow).color}}
													icon={weatherIcon(currentWeather.weather[0].id, timeNow).icon!}
												/>
											</div>
										</div>
										<div>
											{letterToUpperCase(currentWeather.weather[0].description)}
										</div>
									</div>
									<div className="nowWeatherBottomContainer">
										<div>
											<FontAwesomeIcon icon={faCalendarDays}/>
											<span>{date('ENG', todayOptions)}</span>
										</div>
										<div>
											<FontAwesomeIcon icon={faLocationDot}/>
											<span>{currentWeather.name}</span>
										</div>
									</div>
								</div>
							</div>
							<div className="forecastContainer">
								<div>
									<div>
										<span>
											Days Forecast
										</span>
									</div>
									<div>
										{fiveDayForecast.map((item : ForecastWeatherListItem) => (
											<div className="fiveDayForecastContainer" key={`fiveDayForecast_${item.dt_txt}`}>
												<div>
													<FontAwesomeIcon 
														style={{color: weatherIcon(item.weather[0].id, item.dt_txt.slice(10, 16)).color}} 
														icon={weatherIcon(item.weather[0].id, item.dt_txt.slice(10, 16)).icon!}
													/>
													<div>
														<span>{Math.floor(item.main.temp)}</span>
														<span>°C</span>
													</div>
												</div>
												<div>
													{date('ENG', forecastMonth, item.dt_txt)}
												</div>
												<div>
													{date('ENG', forecastWeekday, item.dt_txt)}
												</div>
											</div>
										))}
									</div>	
								</div>
							</div>
						</div>
						<div>
							<div className="fullInfoContainer">
								<div>
									<div>
										<span>Todays Highlights</span>
									</div>
									<div>
										<div className="windAndSunsetContainer">
											<div className="windContainer">
												<div>
													<div>Air Quality Index</div>
													<div style={{backgroundColor: `${airIndexBgColor[airPollution.list[0].main.aqi - 1].color}`}}>
														{airIndexBgColor[airPollution.list[0].main.aqi - 1].label}
													</div>
												</div>
												<div>
													<FontAwesomeIcon icon={faWind}/>
													{airIndexInfoFull.map(airIndex => (
														<div key={`airIndex_${airIndex.name}`}>
															<span>{airIndex.label}</span>
															{airIndex.value}
														</div>
													))}
												</div>
											</div>
											<div className="todaysHighlightsExtraBlocksContainer">
												<div>
													<span>Humidity</span>
													<div>
														<FontAwesomeIcon icon={faDroplet}/>
														<div>
															<span>{currentWeather.main.humidity}</span>
															<span>%</span>
														</div>
													</div>
												</div>
												<div>
													<span>Pressure</span>
													<div>
														<FontAwesomeIcon icon={faArrowsDownToLine}/>
														<div>
															<span>{currentWeather.main.pressure}</span>
															<span>hPa</span>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="windAndSunsetContainer">
											<div className="sunsetContainer">
												<div>
													Sunrise & Sunset
												</div>
												<div>
													<div>
														<FontAwesomeIcon icon={faSun}/>
														<div>
															<span>Sunrise</span>
															<span>{sunSetAndSunRise('sunrise', lat, lon)}</span>
														</div>
													</div>
													<div>
														<FontAwesomeIcon icon={faMoon}/>
														<div>
															<span>Sunset</span>
															<span>{sunSetAndSunRise('sunset', lat, lon)}</span>
														</div>
													</div>
												</div>
											</div>
											<div className="todaysHighlightsExtraBlocksContainer">
												<div>
													<span>Visibility</span>
													<div>
														<FontAwesomeIcon icon={faEye}/>
														<div>
															<span>{currentWeather.visibility / 1000}</span>
															<span>km</span>
														</div>
													</div>
												</div>
												<div>
													<span>Feels like</span>
													<div>
														<FontAwesomeIcon icon={faTemperatureHigh}/>
														<div id='tempFeelsLike'>
															<span>{Math.floor(currentWeather.main.feels_like)}</span>
															<span>°C</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="timeLineContainer">
								<div>
									<div>
										<span>
											Weather soon
										</span>
									</div>
									{windowWidth > 900 ? (
										<div className="weatherSoonMainContainer">
											{soonW.map((item : ForecastWeatherListItem) =>
												<div className="weatherSoonContainer" key={`soonW_${item.dt_txt}`}>
													<div>
														<div>{item.dt_txt.slice(10, 16)}</div>
														<div className="weatherSoonInfoContainer">
															<div>
																<FontAwesomeIcon 
																	style={{color: weatherIcon(item.weather[0].id, item.dt_txt.slice(10, 16)).color}}	
																	icon={weatherIcon(item.weather[0].id, item.dt_txt.slice(10, 16)).icon!}
																/>
																<div>
																	<span>{Math.floor(item.main.temp)}</span>
																	<span id="soonWCelsius">°C</span>
																</div>
															</div>
															<div>
																<FontAwesomeIcon icon={faLocationArrow} style={{transform: `rotate(${135+item.wind.deg}deg)`}}/>
																<div>
																	<span>{Math.floor(item.wind.speed * 10) / 10}</span>
																	<span>m/s</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											)}
										</div>
									) : (
										<Slider { ...sliderSettings }>
											{soonW.map((item : ForecastWeatherListItem) =>
												<div className="weatherSoonContainer" key={`soonW_${item.dt_txt}`}>
													<div>
														<div>{item.dt_txt.slice(10, 16)}</div>
														<div className="weatherSoonInfoContainer">
															<div>
																<FontAwesomeIcon 
																	style={{color: weatherIcon(item.weather[0].id, item.dt_txt.slice(10, 16)).color}}	
																	icon={weatherIcon(item.weather[0].id, item.dt_txt.slice(10, 16)).icon!}
																/>
																<div>
																	<span>{Math.floor(item.main.temp)}</span>
																	<span id="soonWCelsius">°C</span>
																</div>
															</div>
															<div>
																<FontAwesomeIcon icon={faLocationArrow} style={{transform: `rotate(${135+item.wind.deg}deg)`}}/>
																<div>
																	<span>{Math.floor(item.wind.speed * 10) / 10}</span>
																	<span>m/s</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											)}
										</Slider>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		) : <Loader/>
}

export {Weather}