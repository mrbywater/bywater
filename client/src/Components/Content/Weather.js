import './Main.scss'
import './Weather.scss'
import axios from "axios"
import { useState, useEffect } from 'react'
import { Loader } from './Loader.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
	faMagnifyingGlassLocation, 
	faCalendarDays, 
	faLocationDot,
	faCloud,
	faWind,
	faSun,
	faMoon,
	faTemperatureHigh,
	faArrowsDownToLine,
	faEye,
	faDroplet,
	faLocationArrow
} from "@fortawesome/free-solid-svg-icons";
import SunCalc from "suncalc"

const Weather = () => {

	const [currentWeather, setCurrentWeather] = useState(null)
	const [forecastWeather, setForecastWeather] = useState(null)
	const [soonW, setSoonW] = useState([])
	const [fiveDayForecast, setFiveDayForecast] = useState([])
	const [airPollution, setAirPollution] = useState(null)
	const [focused, setFocused] = useState(false)
	
	const lat = '46.57757845344025'
	const lon = '30.90834335028632'
	const apiKey = '88b372b9491a6699d7e30e316c860b20'
	
	const todayOptions = { weekday: 'long', month: 'short', day: 'numeric' };
	const forecastMonth = {  day: 'numeric', month: 'short'}
	const forecastWeekday = { weekday: 'short' }

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

	const data = (lan, opt, day = null) => {
		const dataToday = new Date();
		const dataForecast = new Date(day)

		if (day) {
			return dataForecast.toLocaleString(lan, opt);
		} else {
			return dataToday.toLocaleString(lan, opt);
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
				)
			)
		}
	}, [forecastWeather])

	// switch (airIndex) {
	//   case 1:
	//     setAirIndexColor('#058240')
	//     break;
	//   case 2: 
	//     setAirIndexColor('#637713')
	//     break;
	//   case 3:
	//    setAirIndexColor('#f3b800')
	//     break;
	//   case 4:
	//     setAirIndexColor('#EE9B01')
	//     break;
	//   case 5:
	//     setAirIndexColor('#BC0000')
	//     break;
	// }	


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
													<FontAwesomeIcon icon={faCloud}/>
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
										{fiveDayForecast.map(item => (
											<div className="fiveDayForecastContainer" key={`fiveDayForecast_${item.dt_txt}`}>
												<div>
													<FontAwesomeIcon icon={faCloud}/>
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
													<div>{item.list[0].main.aqi}</div>
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
															<FontAwesomeIcon icon={faCloud}/>
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