import './style.css';
import getWeatherData from './modules/getWeatherData';
import moment from 'moment/moment';
import Swal from 'sweetalert2';

const getNewCity = async (evt, city = 'caracas') => {
  const res = await getWeatherData(city);
  if (!res) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'City not found'
    });
    return false;
  }
  res.localtime = moment(res.localtime, 'yyyy-mm-dd hh:mm');
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

window.addEventListener('load', getNewCity);
const modalButton = document.querySelector('.search-city');
modalButton.addEventListener('click', showModal);
