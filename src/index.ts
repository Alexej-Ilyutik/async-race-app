import { renderPage } from './components/page/page';
import { renderGarage } from './components/garage/garage';
import { updateGarage } from './components/garage/updateGarage';
import {
  getCreateCar,
  updateCar,
  getCarById,
  getAllWinner,
  deleteCarById,
  saveWinner,
  createWinner,
  deleteWinner,
} from './services/api';
import { Car } from './shared/types';
import { generateRandomCars } from './shared/utils/generateCars';
import { race } from './shared/utils/race';
import { startDriving, stopDriving } from './shared/utils/driving';
import { renderWinners, updateWinners, setSortOrder } from './components/winners/winners';
import './style.scss';

import store from './services/store';

renderPage();
await updateGarage();

let selectedCar: Car;

const root = document.querySelector('#root') as HTMLBodyElement;
const createForm = document.getElementById('create-form') as HTMLFormElement;
const updateForm = document.getElementById('update-form') as HTMLFormElement;

const selectCarName = document.getElementById('update-name') as HTMLInputElement;
const selectCarColor = document.getElementById('update-color') as HTMLInputElement;
const updateBtn = document.getElementById('update-btn') as HTMLButtonElement;

const garage = document.getElementById('garage-page') as HTMLDivElement;
const winners = document.getElementById('winners-page') as HTMLDivElement;

const garagePage = document.getElementById('garage-page') as HTMLDivElement;
const winnersPage = document.getElementById('winners-page') as HTMLDivElement;

const winMessage = document.getElementById('win-message') as HTMLElement;

createForm.addEventListener('submit', async event => {
  event.preventDefault();

  const nameInput = document.getElementById('create-name') as HTMLInputElement;
  const colorInput = document.getElementById('create-color') as HTMLInputElement;
  const car = { name: nameInput.value, color: colorInput.value };

  await getCreateCar(car);
  await updateGarage();

  garage.innerHTML = renderGarage();
  nameInput.value = '';
  colorInput.value = '#61B0FA';
});

updateForm.addEventListener('submit', async event => {
  event.preventDefault();

  const nameInput = document.getElementById('update-name') as HTMLInputElement;
  const colorInput = document.getElementById('update-color') as HTMLInputElement;

  const car = { name: nameInput.value, color: colorInput.value };

  await updateCar(selectedCar.id, car);
  await updateGarage();

  garage.innerHTML = renderGarage();
  nameInput.value = '';
  updateBtn.disabled = true;
  nameInput.disabled = true;
  colorInput.disabled = true;
  colorInput.value = '#61B0FA';
});

const selectBtnClick = async (target: HTMLElement) => {
  selectedCar = await getCarById(target.id.split('select-car-')[1]);

  selectCarName.value = selectedCar.name;
  selectCarColor.value = selectedCar.color;
  selectCarName.disabled = false;
  selectCarColor.disabled = false;
  updateBtn.disabled = false;
};

const removeBtnClick = async (target: HTMLElement) => {
  const id = Number(target.id.split('remove-car-')[1]);
  await deleteCarById(id);
  await updateGarage();
  await deleteWinner(id);
  garage.innerHTML = renderGarage();
};

const prevBtnClick = async () => {
  switch (store.view) {
    case 'garage': {
      store.carsPage -= 1;
      await updateGarage();

      garage.innerHTML = renderGarage();
      break;
    }
    case 'winners': {
      store.winnersPage -= 1;
      await updateWinners();

      winners.innerHTML = renderWinners();
      break;
    }
    default:
  }
};

const nextBtnClick = async () => {
  switch (store.view) {
    case 'garage': {
      store.carsPage += 1;
      await updateGarage();

      garage.innerHTML = renderGarage();
      break;
    }
    case 'winners': {
      store.winnersPage += 1;
      await updateWinners();

      winners.innerHTML = renderWinners();
      break;
    }
    default:
  }
};

const generateBtnClick = async (event: MouseEvent) => {
  const generateBtn = <HTMLButtonElement>event.target;
  generateBtn.disabled = true;

  const generatedCars = generateRandomCars();

  await Promise.all(generatedCars.map(async car => getCreateCar(car)));
  await updateGarage();
  garage.innerHTML = renderGarage();
  generateBtn.disabled = false;
};

const raceBtnClick = async (event: MouseEvent) => {
  const raceBtn = <HTMLButtonElement>event.target;

  raceBtn.disabled = true;

  const resetBtn = document.getElementById('reset') as HTMLButtonElement;
  resetBtn.disabled = false;

  const arrWinners = await getAllWinner();
  const newArr = arrWinners.map(obj => obj.id);

  const winner = await race(startDriving);

  if (newArr.includes(winner.id)) {
    await saveWinner(winner);
  }else{
    await createWinner({
      id: winner.id,
      wins: 1,
      time: winner.time,
    });
  }
  winMessage.innerHTML = `${winner.name} won in ${winner.time} seconds!`;
  winMessage.classList.remove('hidden');

  setTimeout(() => {
    winMessage.classList.add('hidden');
  }, 3000);
};

const resetBtnClick = async (event: MouseEvent) => {
  const resetBtn = <HTMLButtonElement>event.target;

  resetBtn.disabled = true;

  store.cars.map(({ id }) => stopDriving(id));

  winMessage.classList.add('hidden');

  const raceBtn = document.getElementById('race') as HTMLButtonElement;
  raceBtn.disabled = false;
};

const garageBtnClick = async () => {
  await updateGarage();

  store.view = 'garage';

  garagePage.style.display = 'block';
  winnersPage.style.display = 'none';
};

const winnersBtnClick = async () => {
  winnersPage.style.display = 'block';
  garagePage.style.display = 'none';

  await updateWinners();

  store.view = 'winners';

  winnersPage.innerHTML = renderWinners();
};

root.addEventListener('click', async event => {
  const target = <HTMLElement>event.target;

  if (target.classList.contains('car__select-btn')) {
    selectBtnClick(target);
  }

  if (target.classList.contains('car__remove-btn')) {
    removeBtnClick(target);
  }

  if (target.classList.contains('prev-button')) {
    prevBtnClick();
  }

  if (target.classList.contains('next-button')) {
    nextBtnClick();
  }

  if (target.classList.contains('generate-btn')) {
    generateBtnClick(event);
  } else if (target.classList.contains('race-btn')) {
    raceBtnClick(event);
  } else if (target.classList.contains('reset-btn')) {
    resetBtnClick(event);
  } else if (target.classList.contains('tools__garage-btn')) {
    garageBtnClick();
  } else if (target.classList.contains('tools__winners-btn')) {
    winnersBtnClick();
  }

  if (target.classList.contains('start-engine-btn')) {
    const id = Number(target.id.split('start-engine-car-')[1]);
    startDriving(id);
  }

  if (target.classList.contains('stop-engine-btn')) {
    const id = Number(target.id.split('stop-engine-car-')[1]);
    stopDriving(id);
  }

  if (target.classList.contains('table-wins')) {
    setSortOrder('wins');
  } else if (target.classList.contains('table-time')) {
    setSortOrder('time');
  }
});
