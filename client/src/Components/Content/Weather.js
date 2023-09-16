import './Main.scss'
import axios from "axios"
import { useState, useEffect } from 'react'

const Weather = () => {

	const [weather, setWeather] = useState(null)

	const weatherAPI = async () => {
		try {
		    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=46.578364&lon=30.906129&units=metric&appid=88b372b9491a6699d7e30e316c860b20`)
		    return setWeather(response.data)
		  } catch (err) {
		    console.error(err.toJSON())
		  }
	}

	useEffect(() => {
		weatherAPI()
		console.log(weather)
	}, [])

	if(weather !== null){
		return (
			<div className="mainContainerContent">
				{weather.wind.deg}
			</div>
		)
	}
	
}

export {Weather}