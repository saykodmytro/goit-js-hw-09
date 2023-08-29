const btnSatrt = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnSatrt.addEventListener('click', onBtnSatrtClick);
btnStop.addEventListener('click', onBtnStopClick);
let timerId = null;

function onBtnSatrtClick() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnSatrt.disabled = true;
}

function onBtnStopClick() {
  clearInterval(timerId);
  btnSatrt.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
