import { getCars } from './api';

const { items: cars, count: carsCount } = await getCars(1);

const animation: { [key: number]: { id: number } } = {};

export default {
  carsPage: 1,
  winnersPage: 1,
  cars,
  carsCount,
  animation,
  view: 'garage',
  sortBy: '',
  sortOrder: '',
};

export {};
