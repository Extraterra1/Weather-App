import './style.css';
import getWeatherData from './modules/getWeatherData';
import moment from 'moment/moment';
import getEmoji from './modules/getEmoji';
import Swal from 'sweetalert2';
import fetchJSON from './modules/fetchJSON';

const getNewCity = async (city = 'porto', options = {}) => {
  const { displayToast = true } = options;
  const res = await getWeatherData(city);
  if (!res) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: 'Oops...',
      text: 'City not found',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false
    });
    return false;
  }
  res.localtime = moment(res.localtime, 'yyyy-mm-dd hh:mm');

  const title = document.querySelector('h2.city');
  title.textContent = `${res.city}, ${res.country}`;
  const temp = document.querySelector('span.weather-val:first-child');
  temp.textContent = `${res.tempC}C ${getEmoji('temp', res.tempC)}`;
  const condition = document.querySelector('li:nth-child(2)');
  const conditionEmojiBox = document.createElement('span');
  condition.textContent = res.condition;
  conditionEmojiBox.classList.add('weather-val');
  conditionEmojiBox.textContent = getEmoji('condition', res.condition);
  condition.appendChild(conditionEmojiBox);
  const humidity = document.querySelector('li:nth-child(3) span.weather-val');
  humidity.textContent = `${res.humidity}% 💦`;
  const wind = document.querySelector('li:nth-child(4) span.weather-val');
  wind.textContent = `${res.wind}km/h 💨`;
  const img = document.querySelector('img.city');
  img.src = res.image;
  const localTime = document.querySelector('li:nth-child(5) span.weather-val');
  localTime.textContent = res.localtime.format('hh:mm A') + ' 🕒';

  const container = document.querySelector('.content');
  container.style.opacity = 1;
  if (displayToast) {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Done!',
      text: 'Showing info for ' + res.city,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  }
};

const showModal = async function (evt) {
  const modal = await Swal.fire({
    padding: '3rem',
    width: '40rem',
    customClass: {
      popup: 'swal-popup',
      confirmButton: 'swal-confirm',
      input: 'swal-input',
      validationMessage: 'swal-validation-message'
    },
    confirmButtonText: 'Search',
    title: 'Search for a new city',
    input: 'text',
    inputPlaceholder: 'Enter your city',
    inputAttributes: {
      required: true
    },
    validationMessage: 'Please enter a city'
  });
  const city = modal.value;

  if (city) {
    await getNewCity(city);
  }
};

window.addEventListener('load', async () => {
  const res = await fetchJSON('http://www.geoplugin.net/json.gp');
  const { geoplugin_city: city } = res;
  await getNewCity(city, { displayToast: false });
});
const modalButton = document.querySelector('.search-city');
modalButton.addEventListener('click', showModal);
