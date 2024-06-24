import './GraphicCurrencyConverter.scss';
import * as moment from 'moment';
import { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useScreenResize } from '../helper';
import {
  GraphicCurrencyConverterItem,
  GraphicValue,
  GraphicValueData,
  GraphicValueOptions,
} from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const options: GraphicValueOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const GraphicCurrencyConverter = (props: GraphicCurrencyConverterItem) => {
  const {
    datesArr,
    graphicValues,
    firstInputShortCurrency,
    secondInputShortCurrency,
  } = props;

  const windowWidth: number = useScreenResize();

  const [value, setValue] = useState<number[]>([]);

  useMemo((): void => {
    setValue(
      graphicValues.map(
        (item: GraphicValue) =>
          item.rates[secondInputShortCurrency].rate /
          item.rates[firstInputShortCurrency].rate,
      ),
    );
  }, [firstInputShortCurrency, secondInputShortCurrency, graphicValues]);

  const labels: string[] = datesArr.map((dates: string) =>
    moment.default(dates).format('MMM'),
  );

  const minValue: number = Math.min(...value);
  const sum: number = value.reduce((a: number, b: number) => +a + +b, 0);
  const avgValue: number = sum / value.length || 0;
  const maxValue: number = Math.max(...value);

  const data: GraphicValueData = {
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
      <div className="graphicValuesContainer">
        <Line options={options} data={data} />
      </div>
      <div>
        <div className="graphicAmount">
          <div>Min</div>
          <div>Avg</div>
          <div>Max</div>
        </div>
        <div className="graphicAmount">
          <div>{(minValue + '').slice(0, 11)}</div>
          <div>{(avgValue + '').slice(0, 11)}</div>
          <div>{(maxValue + '').slice(0, 11)}</div>
        </div>
      </div>
    </>
  );
};

export { GraphicCurrencyConverter };
