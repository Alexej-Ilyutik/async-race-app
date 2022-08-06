import { getCars } from '../../services/api';
import store from '../../services/store';
import { renderCar } from '../car/car';

export const renderGarage = (): string => `
    <h2 class="garage__title">Garage (${store.carsCount} cars)</h2>
    <p class="garage__page">Page #${store.carsPage}</p>
    <ul class="garage__cars">
      ${store.cars.map(car => `<li class="garage__item car">${renderCar(car)}</li>`).join('')}
    </ul>
`;
