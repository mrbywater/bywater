import {
  faCalculator,
  faCircle,
  faCloud,
  faCloudBolt,
  faCloudMeatball,
  faCloudMoon,
  faCloudMoonRain,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudSun,
  faCloudSunRain,
  faMoon,
  faSmog,
  faSnowflake,
  faTemperatureHalf,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export const FAST_CHOICE_CURRENCY_ARR = ['USD', 'EUR', 'UAH', 'JPY'];

export const HEADER_BUTTONS = [
  {
    icon: faUser,
    name: 'Home',
    selectColor: '#22222E',
  },
  {
    icon: faTemperatureHalf,
    name: 'Weather',
    selectColor: '#271B80',
  },
  {
    icon: faCalculator,
    name: 'Currency converter',
    selectColor: '#F3D408',
  },
];

export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
export const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0';
export const CONVERTER_API_URL = 'https://api.getgeoapi.com/v2/currency';

export const CURRENCY_API_KEY = 'd235c21d0b78818653feef36b9149cc49272039f';
export const WEATHER_API_KEY = '00cf10c3137056d7ada001eac2f8b7f6';

export const SKILLS_ARR = [
  {
    name: 'JS',
    img: require('../media/js.png'),
  },
  {
    name: 'HTML',
    img: require('../media/html.png'),
  },
  {
    name: 'CSS',
    img: require('../media/css.png'),
  },
  {
    name: 'Git',
    img: require('../media/git.png'),
  },
  {
    name: 'React',
    img: require('../media/react.png'),
  },
  {
    name: 'TypeScript',
    img: require('../media/typescript.png'),
  },
  {
    name: 'Sass',
    img: require('../media/sass.png'),
  },
  {
    name: 'Axios',
    img: require('../media/axios.png'),
  },
  {
    name: 'ES6',
    img: require('../media/es6.png'),
  },
];

export const WEATHER_ICONS_ARR = [
  {
    name: 'thunderstorm',
    icon: faCloudBolt,
    color: '#FBCE02',
    idArr: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  },
  {
    name: 'drizzle',
    icon: faCloudRain,
    color: '#B1B7BA',
    idArr: [300, 301, 302, 310, 311, 312, 313, 314, 321],
  },
  {
    name: 'rain',
    timeStyleChange: {
      day: {
        icon: faCloudSunRain,
        color: '#83c1e8',
      },
      night: {
        icon: faCloudMoonRain,
        color: '#20204d',
      },
    },
    idArr: [500, 501, 502, 503, 504],
  },
  {
    name: 'rainSnow',
    icon: faCloudMeatball,
    color: '#c1e3ff',
    idArr: [511],
  },
  {
    name: 'rainCloud',
    icon: faCloudShowersHeavy,
    color: '#193f6e',
    idArr: [520, 521, 522, 531],
  },
  {
    name: 'snow',
    icon: faSnowflake,
    color: '#e1ebec',
    idArr: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  },
  {
    name: 'atmosphere',
    icon: faSmog,
    color: '#c2c5cb',
    idArr: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  },
  {
    name: 'clear',
    timeStyleChange: {
      day: {
        icon: faCircle,
        color: '#FBCE02',
      },
      night: {
        icon: faMoon,
        color: '#f1eaca',
      },
    },
    idArr: [800],
  },
  {
    name: 'fewClouds',
    timeStyleChange: {
      day: {
        icon: faCloudSun,
        color: '#FAD074',
      },
      night: {
        icon: faCloudMoon,
        color: '#272727',
      },
    },
    idArr: [801],
  },
  {
    name: 'clouds',
    icon: faCloud,
    color: '#f9f9f7',
    idArr: [802, 803, 804],
  },
];

export const AIR_INDEX_BG_COLOR = [
  {
    label: 'Good',
    color: '#058240',
  },
  {
    label: 'Fair',
    color: '#637713',
  },
  {
    label: 'Moderate',
    color: '#f3b800',
  },
  {
    label: 'Poor',
    color: '#EE9B01',
  },
  {
    label: 'Very Poor',
    color: '#BC0000',
  },
];

export const AIR_INDEX_INFO = [
  {
    label: 'PM2.5',
    name: 'pm2_5',
  },
  {
    label: 'SO2',
    name: 'so2',
  },
  {
    label: 'NO2',
    name: 'no2',
  },
  {
    label: 'O3',
    name: 'o3',
  },
];
