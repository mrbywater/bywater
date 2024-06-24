import React, { Dispatch, SetStateAction } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type SetState<T> = Dispatch<SetStateAction<T>>;

// export type GetComponentProps<T> = React.FC<T>;

export type ApiResponseType<T> = T | null;

export type HeaderButtons = {
  icon: IconDefinition;
  name: string;
  selectColor: string;
};

export type LatAndLoneType = number | string;

export type WeatherDateOptions = {
  weekday?: 'short' | 'long';
  month?: 'short';
  day?: 'numeric';
};

export type StyleChangeIcon = {
  icon: IconDefinition;
  color: string;
};

export type ApiWeather = [
  {
    description: string;
    icon: string;
    id: number;
    main: string;
  },
];

export type ForecastWeatherListItem = {
  clouds: {
    [key: string]: number;
  };
  data?: string;
  dt: number;
  dt_txt: string;
  main: {
    [key: string]: number;
  };
  pop: number;
  sys: {
    [key: string]: string;
  };
  visibility: number;
  weather: ApiWeather;
  wind: {
    [key: string]: number;
  };
};

export type AllCurrencySymbols = {
  [key: string]: string;
};

export interface WeatherIcon {
  name: string;
  idArr: number[];
  timeStyleChange?: {
    day: StyleChangeIcon;
    night: StyleChangeIcon;
  };
  icon?: IconDefinition;
  color?: string;
}

export interface WeatherGeoItem {
  country: string;
  lat: number;
  local_names: {
    [key: string]: string;
  };
  lon: number;
  name: string;
  state: string;
}

export interface CurrentWeather {
  base: string;
  clouds: {
    [key: string]: number;
  };
  cod: number;
  coord: {
    [key: string]: number;
  };
  dt: number;
  id: number;
  main: {
    [key: string]: number;
  };
  name: string;
  rain: {
    [key: string]: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: ApiWeather;
  wind: {
    [key: string]: number;
  };
}

export interface AirPollutionIndex {
  coord: {
    [key: string]: number;
  };
  list: [
    {
      components: {
        [key: string]: number;
      };
      dt: number;
      main: {
        aqi: number;
      };
    },
  ];
}

export interface AirIndexInfo {
  label: string;
  name: string;
  value?: number;
}

export interface ForecastWeather {
  city: {
    coord: {
      [key: string]: number;
    };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  cod: string;
  list: ForecastWeatherListItem[];
  message: number;
}

export interface WeatherSliderSettings {
  arrows: boolean;
  arrowsBlock: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  dots: boolean;
  duration: number;
  dotsScroll: number;
  slidesToShow: number;
}

export interface GraphicValueOptions {
  responsive: boolean;
  plugins: {
    legend: {
      display: boolean;
    };
    title: {
      display: boolean;
    };
  };
}

export interface GraphicValueData {
  labels: string[];
  datasets: [
    {
      fill: boolean;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      pointRadius: number;
    },
  ];
}

export interface GraphicValue {
  amount: string;
  base_currency_code: string;
  base_currency_name: string;
  rates: any;
  status: string;
  updated_date: string;
}

export interface InputBlockCurrencyConverterItem {
  handlerAmountChange: (event: any) => void;
  amount: number;
  inputFocused: boolean;
  setInputFocused: SetState<boolean>;
  inputShortCurrency: string;
  setInputShortCurrency: SetState<string>;
  inputValue: string;
  setInputValue: SetState<string>;
  currencySymbolsNames: string[][];
}

export interface GraphicCurrencyConverterItem {
  datesArr: string[];
  graphicValues: GraphicValue[];
  firstInputShortCurrency: string;
  secondInputShortCurrency: string;
}

export interface DatePickerOptions {
  label: string;
  type: string;
  className: string;
  onClick: () => void;
}

export interface ConvertCurrencyItem {
  amount: string;
  base_currency_code: string;
  base_currency_name: string;
  rates: {
    [key: string]: {
      [key: string]: string;
    };
  };
  status: string;
  updated_date: string;
}
