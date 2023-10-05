import './Main.scss'
import './Weather.scss'
import axios from "axios"
import moment from 'moment'
import { useState, useEffect, useRef } from 'react'
import { Loader } from './Loader.js'
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
import SunCalc from "suncalc"

	const thunderstorm = [
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

		const drizzle = [
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

		const rain = [
			500,
			501,
			502,
			503,
			504
		]

		const rainSnow = [
			511
		]

		const rainCloud = [
			520,
			521,
			522,
			531
		]

		const snow = [
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

		const atmosphere = [
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

		const clear = [
			800
		]

		const fewClouds = [
			801
		]

		const clouds = [
			802,
			803,
			804
		]

const Weather = () => {

	const dropDownRef = useRef();

	const currentLat = localStorage.getItem('currentLat');
	const currentLon = localStorage.getItem('currentLon');

	const [currentWeather, setCurrentWeather] = useState(null)
	const [geo, setGeo] = useState(null)
	const [airPollution, setAirPollution] = useState(null)
	const [forecastWeather, setForecastWeather] = useState(null)
	const [soonW, setSoonW] = useState([])
	const [fiveDayForecast, setFiveDayForecast] = useState([])
	const [focused, setFocused] = useState(false)
	const [placeName, setPlaceName] = useState('')
	const [value, setValue] = useState('')
	const [lat, setLat] = useState(currentLat ? currentLat : '50.4500336')
	const [lon, setLon] = useState(currentLon ? currentLon : '30.5241361')
	
	const apiKey = '00cf10c3137056d7ada001eac2f8b7f6'

	const dateToday = new Date();
	const todayOptions = { weekday: 'long', month: 'short', day: 'numeric' };
	const forecastMonth = {  day: 'numeric', month: 'short'}
	const forecastWeekday = { weekday: 'short' }
	const timeNow = moment().format('HH:MM')

	const weatherAPI = async () => {
		try {
		    const resCW = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
		    const resF = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
		    const resA = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
		    
		    return (
		    	setCurrentWeather([resCW.data]),
		    	setForecastWeather([resF.data]),
		    	setAirPollution([resA.data])
		    )
		  } catch (err) {
		    console.error(err.toJSON())
		  }
	}

	const geoAPI = async () => {
		try {
		    const resGeo = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${placeName ? placeName : ' '}&limit=5&appid=${apiKey}`)
		    
		    return (
		    	setGeo([resGeo.data])
		    )
		  } catch (err) {
		    console.error(err.toJSON())
		  }
	}

	const onFocus = () => setFocused(true)
	const onBlur = () => setFocused(false)

	const inputHandler = () => (event) => {
		setPlaceName(event.target.value)
		setValue(event.target.value)
	}

	const placeSelectHandler = (item) => () => {
		setLat(item.lat)
		setLon(item.lon)
		setValue('')
		onBlur()
	}

	const date = (lang, opt, day = null) => {
		const dataForecast = new Date(day)

		if (day) {
			return dataForecast.toLocaleString(lang, opt);
		} else {
			return dateToday.toLocaleString(lang, opt);
		}
	}

	const letterToUpperCase = (str) => (
		str.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')
	)

	const sunSetAndSunRise = (state, lat, lon) => {
		const times = SunCalc.getTimes(new Date(), lat, lon);
		const sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
		const sunsetStr = times.sunset.getHours() + ':' + times.sunset.getMinutes();

		if (state === 'sunrise') {
			return sunriseStr
		} else {
			return sunsetStr
		}
	}

	const getCurrentLocatin = () => () => {
		navigator.geolocation.getCurrentPosition((position) => {
      		setLat(position.coords.latitude);
      		setLon(position.coords.longitude);

      		localStorage.setItem('currentLat', position.coords.latitude);
      		localStorage.setItem('currentLon', position.coords.longitude);
   		 });
	}

	const airIndexBgColor = (airIndex) => {

		switch (airIndex) {
			case 1:
				return {
					label: 'Good',
					color: '#058240'
				};
			case 2: 
				return {
					label: 'Fair',
					color: '#637713'
				};
			case 3:
				return {
					label: 'Moderate',
					color: '#f3b800'
				};
			case 4:
				return {
					label: 'Poor',
					color: '#EE9B01'
				};
			case 5:
				return {
					label: 'Very Poor',
					color: '#BC0000'
				};
			default:
				return {
					label: 'Good',
					color: '#058240'
				};
		}	
	}

	const weatherIcon = (id, time) => {

		const sunR = moment(sunSetAndSunRise('sunrise', lat, lon), "HH:mm");
		const sunS = moment(sunSetAndSunRise('sunset', lat, lon), "HH:mm");
		const currentTime = moment(time, "HH:mm");

		if (thunderstorm.includes(id)) {
			return {
				icon: faCloudBolt,
				color: '#FBCE02'
			}
		} else if (drizzle.includes(id)) {
			return {
				icon: faCloudRain,
				color: '#B1B7BA'
			}
		} else if (rain.includes(id)) {
			if ( currentTime >= sunR && currentTime < sunS) {
				return {
					icon: faCloudSunRain,
					color: '#83c1e8'
				}
			} else {
				return {
					icon: faCloudMoonRain,
					color: '#20204d'
				}
			}
		} else if (rainSnow.includes(id)) {
			return {
				icon: faCloudMeatball,
				color: '#c1e3ff'
			}
		} else if (rainCloud.includes(id)) {
			return {
				icon: faCloudShowersHeavy,
				color: '#193f6e'
			}
		} else if (snow.includes(id)) {
			return {
				icon: faSnowflake,
				color: '#e1ebec'
			}
		} else if (atmosphere.includes(id)) {
			return {
				icon: faSmog,
				color: '#c2c5cb'
			}
		} else if (clear.includes(id)) {
			if ( currentTime >= sunR && currentTime < sunS) {
				return {
					icon: faCircle,
					color: '#FBCE02'
				}
			} else {
				return {
					icon: faMoon,
					color: '#f1eaca'
				}
			}
		} else if (fewClouds.includes(id)) {
			if ( currentTime >= sunR && currentTime < sunS) {
				return {
					icon: faCloudSun,
					color: '#FAD074'
				}
			} else {
				return {
					icon: faCloudMoon,
					color: '#272727'
				}
			}
			
		} else if (clouds.includes(id)) {
			return {
				icon: faCloud,
				color: '#f9f9f7'
			}
		}		
	
	}

	useEffect(() => {
		weatherAPI()
	}, [lat, lon])

	useEffect(() => {
		geoAPI()
	}, [placeName])

	useEffect(() => {
		if (forecastWeather) {
			const list = forecastWeather[0].list
			
			setSoonW(list.filter((item, index) => index < 8))

			const fiveDayArrFinder = list.map(item => {
				return {
					...item,
					data: moment(item.dt_txt.slice(0, 10)).format('L')
				}
			})

			setFiveDayForecast(
				fiveDayArrFinder.reverse().filter((elm, id) => (
					fiveDayArrFinder.findIndex((item) => {
						if (moment().format('L') !== item.data) {
							return item.data === elm.data
						}
					}) === id)
				).reverse()
			)
		}
	}, [forecastWeather])

	useEffect(()=> {
		const handleClickOutside = (event) => {
			if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
				onBlur()
			}
		};

		document.addEventListener('click', handleClickOutside);

	}, [])

	if (currentWeather && forecastWeather && airPollution) {
		return (
			<div className="mainContainerContent">
				<div className="weatherContainer">
					<div className="searchContainer">
						<div 
							style={focused ? {width: "25%"} : {}} 
							ref={dropDownRef}
						>
							<input 
								placeholder="Search..." 
								onFocus={onFocus} 
								value={value}
								className={focused && value ? "searchInput searchInputActive" : "searchInput"}
								onChange={inputHandler()}
							/>
							<FontAwesomeIcon className={focused && value ? 'searchAnimation' : ''} icon={faMagnifyingGlassLocation}/>
							<div className={focused && value ? "dropDownMenuActive" : "dropDownMenuNone"}>
								{geo[0].length ? (
									geo[0].map(item => (
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
								{currentWeather.map(item => (
									<div>
										<div className="nowWeatherTopContainer">
											<div>Now</div>
											<div>
												<div>
													{Math.floor(item.main.temp)}
													<span>°C</span>
												</div>
												<div>
													<FontAwesomeIcon 
														style={{color: weatherIcon(item.weather[0].id, timeNow).color}} 
														icon={weatherIcon(item.weather[0].id, timeNow).icon}
													/>
												</div>
											</div>
											<div>
												{letterToUpperCase(item.weather[0].description)}
											</div>
										</div>
										<div className="nowWeatherBottomContainer">
											<div>
												<FontAwesomeIcon icon={faCalendarDays}/>	
												<span>{date('ENG', todayOptions)}</span>
											</div>
											<div>
												<FontAwesomeIcon icon={faLocationDot}/>
												<span>{item.name}</span>
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="forecastContainer">
								<div>
									<div>
										<span>
											Days Forecast
										</span>
									</div>
									<div>
										{fiveDayForecast.map(item => (
											<div className="fiveDayForecastContainer" key={`fiveDayForecast_${item.dt_txt}`}>
												<div>
													<FontAwesomeIcon 
														style={{color: weatherIcon(item.weather[0].id, item.dt_txt.slice(10, 16)).color}} 
														icon={weatherIcon(item.weather[0].id, item.dt_txt.slice(10, 16)).icon}
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
										{airPollution.map(item => (
											<div className="windContainer">
												<div>
													<div>Air Quality Index</div>
													<div style={{backgroundColor: `${airIndexBgColor(item.list[0].main.aqi).color}`}}>{airIndexBgColor(item.list[0].main.aqi).label}</div>
												</div>
												<div>
													<FontAwesomeIcon icon={faWind}/>
													<div>
														<span>PM25</span>
														{item.list[0].components.pm2_5}
													</div>
													<div>
														<span>SO2</span>
														{item.list[0].components.so2}
													</div>
													<div>
														<span>NO2</span>
														{item.list[0].components.no2}
													</div>
													<div>
														<span>O3</span>
														{item.list[0].components.o3}
													</div>
												</div>
											</div>
										))}
										{currentWeather.map(item => (
											<div className="todaysHighlightsExtraBlocksContainer">
												<div>
													<span>Humidity</span>
													<div>
														<FontAwesomeIcon icon={faDroplet}/>
														<div>
															<span>{item.main.humidity}</span>
															<span>%</span>
														</div>
													</div>
												</div>
												<div>
													<span>Pressure</span>
													<div>
														<FontAwesomeIcon icon={faArrowsDownToLine}/>
														<div>
															<span>{item.main.pressure}</span>
															<span>hPa</span>
														</div>
													</div>
												</div>
											</div>
										))}	
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
											{currentWeather.map(item => (
												<div className="todaysHighlightsExtraBlocksContainer">
													<div>
														<span>Visibility</span>
														<div>
															<FontAwesomeIcon icon={faEye}/>
															<div>
																<span>{item.visibility / 1000}</span>
																<span>km</span>
															</div>
														</div>
													</div>
													<div>
														<span>Feels like</span>
														<div>
															<FontAwesomeIcon icon={faTemperatureHigh}/>
															<div id='tempFeelsLike'>
																<span>{Math.floor(item.main.feels_like)}</span>
																<span>°C</span>
															</div>
														</div>
													</div>
												</div>
											))}
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
									<div>
										{soonW.map(item =>
											<div className="weatherSoonContainer" key={`soonW_${item.dt_txt}`}>
												<div>
													<div>{item.dt_txt.slice(10, 16)}</div>
													<div className="weatherSoonInfoContainer">
														<div>
															<FontAwesomeIcon 
																style={{color: weatherIcon(item.weather[0].id, item.dt_txt.slice(10, 16)).color}}	
																icon={weatherIcon(item.weather[0].id, item.dt_txt.slice(10, 16)).icon}
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
																<span>s/m</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										)}
									</div>	
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<Loader/>
		)
	}
	
}

export {Weather}