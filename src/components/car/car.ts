import { getCarImg } from './carImg';
import { Car } from '../../shared/types';

export const renderCar = ({ id, name, color, isEngineStarted }: Car): string => `
  <h3 class="car__title">${name}</h3>
  <div class="car__buttons">
    <button class="btn car__select-btn" id="select-car-${id}">Select</button>
    <button class="btn car__remove-btn" id="remove-car-${id}">Remove</button>
  </div>
  <div class="car__way">
    <div class="car__control">
      <div class="car__engine-panel">
        <button class="car__engine-btn start-engine-btn" id="start-engine-car-${id}" ${
  isEngineStarted ? 'disabled' : ''
}>Start</button>
        <button class="car__engine-btn stop-engine-btn" id="stop-engine-car-${id}" ${
  !isEngineStarted ? 'disabled' : ''
}>Stop</button>
      </div>
      <div class="car__img" id="car-${id}">
        ${getCarImg(color)}
      </div>
    </div>
    <div class="car__finish" id="finish-${id}">
      <img src="../../assets/finish.png" alt="finish">
    </div>
  </div>
  <div class="car__road">
  </div>
`;
