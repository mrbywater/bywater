import './GraficCurrencyConverter.scss'
import moment from 'moment'
import { useState, useMemo } from 'react'
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

	const [value, setValue] = useState([])

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

	useMemo(()=> {
		setValue(graficValues.map(item => (
				item.rates[secondInputShortCurrency].rate
		)))
	}, [graficValues])

	const data = {
	  labels,
	  datasets: [
	    {
	      fill: true,
	      data: value,
	      borderColor: 'rgb(57, 58, 90, 0.7)',
	      backgroundColor: 'rgba(57, 58, 90, 0.4)',
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