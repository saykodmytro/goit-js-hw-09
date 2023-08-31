import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '300px',
  distance: '30px',
  position: 'center-top',
});

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const bodyEl = document.body;

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', startTimer);
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    }
    if (selectedDates[0] >= options.defaultDate) {
      startBtn.disabled = false;
    }
  },
};

const library = flatpickr(inputEl, options);
let timerId = null;

function startTimer() {
  timerId = setInterval(() => {
    updateTimer();

    inputEl.disabled = true;
    inputEl.classList.add('active-timer');
    startBtn.disabled = true;
    startBtn.style.color = 'grey';
  }, 1000);
}

function updateTimer() {
  const currentTime = new Date();
  const setTime = new Date(inputEl.value);
  const deltaTime = setTime - currentTime;
  const { days, hours, minutes, seconds } = convertMs(deltaTime);

  daysEl.textContent = addLeadingZero(`${days}`);
  hoursEl.textContent = addLeadingZero(`${hours}`);
  minutesEl.textContent = addLeadingZero(`${minutes}`);
  secondsEl.textContent = addLeadingZero(`${seconds}`);

  if (deltaTime < 1000) {
    clearInterval(timerId);
    bodyEl.style.backgroundColor = 'red';
    Notiflix.Notify.success('timer stoped');
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
