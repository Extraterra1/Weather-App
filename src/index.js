import './style.css';
import getWeatherData from './modules/getWeatherData';
import moment from 'moment/moment';
import Swal from 'sweetalert2';

const getNewCity = async (city = 'funchal') => {
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
  let emoji;
  if (res.tempC > 30) emoji = '🥵';
  if (res.tempC > 15 && res.tempC < 30) emoji = '😀';
  if (res.tempC > 0 && res.tempC < 15) emoji = '🤧';
  if (res.tempC < 0) emoji = '🥶';
  temp.textContent = `${res.tempC}C ${emoji}`;

  console.log(res);
  return res;
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
    console.log(await getNewCity(null, city));
  }
};

window.addEventListener('load', async () => await getNewCity());
const modalButton = document.querySelector('.search-city');
modalButton.addEventListener('click', showModal);
