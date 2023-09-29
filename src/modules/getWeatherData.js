/* eslint-disable no-undef */
import fetchJSON from './fetchJSON';
import getCityImage from './getCityImage';

export default async (city) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${atob(APIKEY)}&q=${city}`;
    const res = await fetchJSON(url);
    if (res.location.country === 'United States of America') res.location.country = 'USA';
    if (res.location.country === 'United Kingdom') res.location.country = 'UK';

    if (res) {
      return {
        country: res.location.country,
        city: res.location.name,
        localtime: res.location.localtime,
        condition: res.current.condition.text,
        tempC: res.current.temp_c.toFixed(0),
        tempF: res.current.temp_f.toFixed(0),
        humidity: res.current.humidity,
        image: await getCityImage(city)
      };
    }

    throw new Error('City not found');
  } catch (error) {
    console.log(error.message);
  }
};
