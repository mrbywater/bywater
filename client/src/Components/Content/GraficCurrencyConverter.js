import './GraficCurrencyConverter.scss'
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

const GraficCurrencyConverter = () => {

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

	const labels = ['January', 'February', 'March', 'April', 'May'];

	const data = {
	  labels,
	  datasets: [
	    {
	      fill: true,
	      data: [217594, 181045, 253060, 156519, 175162],
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