import store from '../../services/store';
import { renderCar } from '../car/car';
import './garage.scss';

export const renderGarage = (): string => `
    <h2 class="garage__title">Garage (${store.carsCount} cars)</h2>
    <p class="garage__page">Page #${store.carsPage}</p>
    <div class="garage__pagination">
      <button class="btn prev-button" disabled id="prev">Prev</button>
      <button class="btn next-button" disabled id="next">Next</button>
    </div>
    <ul class="garage__cars">
      ${store.cars.map(car => `<li class="garage__item car">${renderCar(car)}</li>`).join('')}
    </ul>
`;
