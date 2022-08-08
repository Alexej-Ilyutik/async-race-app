import store from '../../services/store';
import { renderCar } from '../car/car';
import './garage.scss';

export const renderGarage = (): string => `
    <h2 class="garage__title subtitle">Garage (${store.carsCount} cars)</h2>
    <p class="garage__page subtitle__page">Page #${store.carsPage}</p>
    <ul class="garage__cars">
      ${store.cars.map(car => `<li class="garage__item car">${renderCar(car)}</li>`).join('')}
    </ul>
`;

