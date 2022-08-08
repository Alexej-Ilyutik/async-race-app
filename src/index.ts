import { renderPage } from './components/page/page';
import { renderGarage } from './components/garage/garage';
import { updateGarage } from './components/garage/updateGarage';
import { getCreateCar, updateCar, getCarById, deleteCarById } from './services/api';
import { Car } from './shared/types';
import { generateRandomCars } from './shared/utils/generateCars';
import { race } from './shared/utils/race';
import { startDriving, stopDriving } from './shared/utils/driving';
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

const garage = document.getElementById('garage') as HTMLDivElement;

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

  garage.innerHTML = renderGarage();
};

const prevBtnClick = async () => {
  store.carsPage -= 1;
  await updateGarage();

  garage.innerHTML = renderGarage();
};

const nextBtnClick = async () => {
  store.carsPage += 1;
  await updateGarage();

  garage.innerHTML = renderGarage();
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

  await race(startDriving);
};

const resetBtnClick = async (event: MouseEvent) => {
  const resetBtn = <HTMLButtonElement>event.target;

  resetBtn.disabled = true;

  store.cars.map(({ id }) => stopDriving(id));

  const raceBtn = document.getElementById('race') as HTMLButtonElement;
  raceBtn.disabled = false;
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
  }

  if (target.classList.contains('start-engine-btn')) {
    const id = Number(target.id.split('start-engine-car-')[1]);
    startDriving(id);
  }

  if (target.classList.contains('stop-engine-btn')) {
    const id = Number(target.id.split('stop-engine-car-')[1]);
    stopDriving(id);
  }
});
