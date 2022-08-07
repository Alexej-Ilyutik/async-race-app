import { renderPage } from './components/page/page';
import { renderGarage } from './components/garage/garage';
import { updateGarage } from './components/garage/updateGarage';
import { getCreateCar, updateCar, getCarById, deleteCarById } from './services/api';
import { Car } from './shared/types';
import './style.scss';

import { getCars } from './services/api';
import store from './services/store';
renderPage();

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
  colorInput.value = '';
});


updateForm.addEventListener('submit', async event => {
  event.preventDefault();

  const updateBtn = document.getElementById('update-btn') as HTMLButtonElement;
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
  colorInput.value = '';
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
  const garage = document.getElementById('garage') as HTMLDivElement;
  garage.innerHTML = renderGarage();
};

root.addEventListener('click', async event => {
  const target = <HTMLElement>event.target;



  if (target.classList.contains('car__select-btn')) {
    selectBtnClick(target);
  }

  if (target.classList.contains('car__remove-btn')) {
    removeBtnClick(target);
  }

});
