import store from '../../services/store';
import { getCars } from '../../services/api';

export const updateGarage = async (): Promise<void> => {
  const { items, count } = await getCars(store.carsPage);
  store.cars = items;
  store.carsCount = count;

  const nextBtn = document.getElementById('next') as HTMLButtonElement;
  nextBtn.disabled = store.carsPage * 7 >= Number(store.carsCount);


  const prevBtn = document.getElementById('prev') as HTMLButtonElement;
  prevBtn.disabled = store.carsPage <= 1;

};
