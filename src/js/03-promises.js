import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputSpep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', submitPromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function submitPromise(e) {
  e.preventDefault();

  const delay = Number(refs.inputDelay.value);
  const step = Number(refs.inputSpep.value);
  const amount = Number(refs.inputAmount.value);

  for (let i = 1; i <= amount; i += 1) {
    let stepProm = delay + step * (i - 1);

    createPromise(i, stepProm)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
