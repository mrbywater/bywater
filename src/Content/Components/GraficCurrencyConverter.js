import './GraficCurrencyConverter.scss'
import moment from 'moment'
import { useState, useMemo, useEffect } from 'react'
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler 
} from 'chart.js';
import {useScreenResize} from "../../helper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler 
);

const GraficCurrencyConverter = (props) => {

	const {
		datesArr,
		graficValues,
		firstInputShortCurrency,
		secondInputShortCurrency
	} = props

	const windowWidth = useScreenResize()

	const [value, setValue] = useState([])

	useMemo(()=> {
			setValue(graficValues.map(item => (
					item.rates[secondInputShortCurrency].rate/item.rates[firstInputShortCurrency].rate
			)))
	}, [firstInputShortCurrency, secondInputShortCurrency, graficValues])

	const options = {
	  responsive: true,
	  plugins: {
	    legend: {
	      display: false
	    },
	    title: {
	      display: false,
	    },
	  },
	};	

	const labels = datesArr.map(dates => moment(dates).format('MMM'));

	const minValue = Math.min(...value) 
	const sum = value.reduce((a, b) => +a + +b, 0);
	const avgValue = (sum / value.length) || 0;
	const maxValue = Math.max(...value) 

	const data = {
	  labels,
	  datasets: [
	    {
	      fill: true,
	      data: value,
	      borderColor: 'rgb(57, 58, 90, 0.7)',
	      backgroundColor: 'rgba(57, 58, 90, 0.4)',
	      pointRadius: windowWidth <= 1100 ? 8 : 3,
	    },
	  ],
	};

	return (
		<>
			<div className="graficValuesContainer">
				<Line options={options} data={data} />
			</div>
			<div>
				<div className='graphicAmount'>
					<div>Min</div>	
					<div>Avg</div>
					<div>Max</div>
				</div>
				<div className='graphicAmount'>
					<div>{(minValue + '').slice(0,11)}</div>
					<div>{(avgValue + '').slice(0,11)}</div>
					<div>{(maxValue + '').slice(0,11)}</div>
				</div>
			</div>
		</>
	)
}

export {GraficCurrencyConverter}