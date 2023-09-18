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
	faMoon 
} from "@fortawesome/free-solid-svg-icons";
import SunCalc from "suncalc"

const todayAt = [
	{
		time: 1
	},
	{
		time: 2
	},
	{
		time: 3
	},
	{
		time: 4
	},
	{
		time: 5
	},
	{
		time: 6
	},
	{
		time: 7
	},
	{
		time: 8
	},
]

const forecast = [
	{
		data: 1
	},
	{
		data: 2
	},
	{
		data: 3
	},
	{
		data: 4
	},
	{
		data: 5
	}
]

const Weather = () => {

	const [currentWeather, setCurrentWeather] = useState(null)
	const [forecastWeather, setForecastWeather] = useState(null)
	const [airPollution, setAirPollution] = useState(null)
	const [focused, setFocused] = useState(false)

	const lat = '46.578537208826745'
	const lon = '30.905969366422877'
	const apiKey = '88b372b9491a6699d7e30e316c860b20'
	const data = new Date();
	const options = { weekday: 'long', month: 'long', day: 'numeric' };
	const today = data.toLocaleString('en-US', options);

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

	

	if (currentWeather !== null || forecastWeather !== null || airPollution !== null) {
		return (
			<div className="mainContainerContent">
				<div className="weatherContainer">
					<div className="searchContainer">
						<div style={focused ? {width: "25%"} : {}}>
							<input 
								placeholder="Search..." 
								onFocus={onFocus} 
								onBlur={onBlur}
								onClick={console.log('currentWeather', currentWeather, "forecastWeather", forecastWeather, "airPollution", airPollution)}
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
													{Math.floor( item.main.temp)}
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
												<span>{today}</span>
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
										{forecast.map(item => (
											<div>
												{item.data}
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
											<div>
												<div>1</div>
												<div>2</div>
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
											<div>
												<div>3</div>
												<div>4</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="timeLineContainer">
								<div>
									<div>
										<span>
											Today at
										</span>
									</div>
									<div>
										{todayAt.map(item => (
											<div>
												{item.time}
											</div>
										))}
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