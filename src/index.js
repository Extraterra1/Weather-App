import './style.css';
import getWeatherData from './modules/getWeatherData';
import moment from 'moment/moment';

const getNewCity = async (evt, city = 'caracas') => {
  const res = await getWeatherData(city);
  res.localtime = moment(res.localtime, 'yyyy-mm-dd hh:mm');
};

window.addEventListener('load', getNewCity);
