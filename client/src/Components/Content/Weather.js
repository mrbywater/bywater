import './Main.scss'
import './Weather.scss'
import axios from "axios"
import moment from 'moment'
import { useState, useEffect } from 'react'
import { Loader } from './Loader.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
	faMagnifyingGlassLocation, 
	faCalendarDays, 
	faLocationDot,
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

	const [currentWeather, setCurrentWeather] = useState(null)
	const [geo, setGeo] = useState(null)
	const [airPollution, setAirPollution] = useState(null)
	const [forecastWeather, setForecastWeather] = useState(null)
	const [soonW, setSoonW] = useState([])
	const [fiveDayForecast, setFiveDayForecast] = useState([])
	const [focused, setFocused] = useState(false)
	const [placeName, setPlaceName] = useState('Kyiv')
	
	const lat = '52.644037739528265'
	const lon = '-0.053882171406064626'
	const apiKey = '88b372b9491a6699d7e30e316c860b20'

	const dataToday = new Date();
	const todayOptions = { weekday: 'long', month: 'short', day: 'numeric' };
	const forecastMonth = {  day: 'numeric', month: 'short'}
	const forecastWeekday = { weekday: 'short' }
	const timeNow = moment().format('HH:MM')

	const onFocus = () => setFocused(true)
	const onBlur = () => setFocused(false)

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
		    const resGeo = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${placeName}&limit=5&appid=${apiKey}`)
		    
		    return (
		    	setGeo([resGeo])
		    )
		  } catch (err) {
		    console.error(err.toJSON())
		  }
	}

	const data = (lang, opt, day = null) => {
		const dataForecast = new Date(day)

		if (day) {
			return dataForecast.toLocaleString(lang, opt);
		} else {
			return dataToday.toLocaleString(lang, opt);
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

	useEffect(() => {
		weatherAPI()
	}, [])

	useEffect(() => {
		if (forecastWeather) {
			const list = forecastWeather[0].list
			
			setSoonW(list.filter((item, index) => index < 8))

			const fiveDayArrFinder = list.map(item => {
				return {
					...item,
					data: item.dt_txt.slice(8, 10)
				}
			})

			setFiveDayForecast(
				fiveDayArrFinder.filter((elm, id) => (
					fiveDayArrFinder.findIndex((item) => item.data === elm.data) === id)
				).reverse().slice(0, 5).reverse()
			)
		}
	}, [forecastWeather])

	const airIndexBgColor = (airIndex) => {

		switch (airIndex) {
		  case 1:
		    return '#058240';
		  case 2: 
		    return '#637713';
		  case 3:
		   return '#f3b800';
		  case 4:
		    return '#EE9B01';
		  case 5:
		    return '#BC0000';
		}	
	}

	const weatherIcon = (id, time) => {

		const sunR = moment(sunSetAndSunRise('sunrise', lat, lon), "HH:mm");
		const sunS = moment(sunSetAndSunRise('sunset', lat, lon), "HH:mm");
		const currentTime = moment(time,"HH:mm");

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
		geoAPI()
		console.log(geo)
	}, [placeName])

	if (currentWeather && forecastWeather && airPollution) {
		return (
			<div className="mainContainerContent">
				<div className="weatherContainer">
					<div className="searchContainer">
						<div style={focused ? {width: "25%"} : {}}>
							<input 
								placeholder="Search..." 
								onFocus={onFocus} 
								onBlur={onBlur}
								// value={placeName}
								onChange={(event) => {
									setPlaceName(event.target.value)
								}}
							/>
							<FontAwesomeIcon icon={faMagnifyingGlassLocation}/>
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
												<span>{data('ENG', todayOptions)}</span>
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
											5 Days Forecast
										</span>
									</div>
									<div>
										{fiveDayForecast.slice(0, 5).map(item => (
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
													{data('ENG', forecastMonth, item.dt_txt)}
												</div>
												<div>
													{data('ENG', forecastWeekday, item.dt_txt)}
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
													<div style={{backgroundColor: `${airIndexBgColor(item.list[0].main.aqi)}`}}>{item.list[0].main.aqi}</div>
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
															<FontAwesomeIcon icon={faLocationArrow} style={{transform: `rotate(${315+item.wind.deg}deg)`}}/>
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