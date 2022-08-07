import store from '../../services/store';
import { getCars } from '../../services/api';

export const updateGarage = async (): Promise<void> => {
  const { items, count } = await getCars(store.carsPage);
  store.cars = items;
  store.carsCount = count;
};
