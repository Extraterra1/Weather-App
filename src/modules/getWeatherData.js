/* eslint-disable no-undef */
import fetchJSON from './fetchJSON';
import moment from 'moment';
import getCityImage from './getCityImage';

export default async (city) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${atob(APIKEY)}&q=${city}`;
    const res = await fetchJSON(url);
    if (!res) throw new Error('City not found');
    if (res.location.country.includes('United States of America')) res.location.country = 'USA';
    if (res.location.country === 'United Kingdom') res.location.country = 'UK';

    if (res) {
      return {
        country: res.location.country,
        city: res.location.name,
        localtime: moment(res.location.localtime, 'yyyy-mm-dd hh:mm').format('hh:mm A'),
        condition: res.current.condition.text,
        tempC: res.current.temp_c.toFixed(0),
        tempF: res.current.temp_f.toFixed(0),
        humidity: res.current.humidity,
        image: await getCityImage(city),
        wind: res.current.wind_kph
      };
    }
  } catch (error) {
    console.log(error.message);
  }
};
