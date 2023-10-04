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

	const [value, setValue] = useState([])

	useMemo(()=> {
		setValue(graficValues.map(item => (
				item.rates[secondInputShortCurrency]/item.rates[firstInputShortCurrency]
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
		<div className="graficContainer">
			<Line options={options} data={data} />
		</div>
	)
}

export {GraficCurrencyConverter}