import './Main.scss'
import './Weather.scss'
import axios from "axios"
import { useState, useEffect } from 'react'
import { Loader } from './Loader.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";

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

	const onFocus = () => setFocused(true)
	const onBlur = () => setFocused(false)

	const weatherAPI = async () => {
		try {
		    const resCW = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=46.578364&lon=30.906129&units=metric&appid=88b372b9491a6699d7e30e316c860b20`)
		    const resF = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=46.578364&lon=30.906129&units=metric&appid=88b372b9491a6699d7e30e316c860b20`)
		    const resA = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=46.578364&lon=30.906129&units=metric&appid=88b372b9491a6699d7e30e316c860b20`)
		    
		    return (
		    	setCurrentWeather(resCW.data),
		    	setForecastWeather(resF.data),
		    	setAirPollution(resA.data)
		    )
		  } catch (err) {
		    console.error(err.toJSON())
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
								<div>
									
								</div>
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
											<div>q</div>
											<div>
												<div>1</div>
												<div>2</div>
											</div>
										</div>
										<div className="windAndSunsetContainer">
											<div>w</div>
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