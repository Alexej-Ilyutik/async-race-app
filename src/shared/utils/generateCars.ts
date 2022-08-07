import { AnyCar } from '../types';

const hexLetters = '0123456789ABCDEF';
const brands = ['Volvo', 'Mitsubishi', 'Audi', 'Hyundai', 'Ford', 'Volkswagen', 'Honda', 'BMW', 'Skoda', 'Toyota'];
const bodyTypes = [
  'Cargo van',
  'Convertible',
  'Coupe',
  'Hatchback',
  'Minivan',
  'Passenger van',
  'Pickup truck',
  'SUV',
  'Sedan',
  'Wagon',
];

const getRandomCarName = () => {
  const brand = Math.floor(Math.random() * brands.length);
  const body = Math.floor(Math.random() * bodyTypes.length);

  return `${brands[brand]} ${bodyTypes[body]}`;
};

const getRandomCarColor = () => {
  let carColor = '#';

  for (let i = 0; i < 6; i += 1) {
    carColor += hexLetters[Math.floor(Math.random() * hexLetters.length)];
  }

  return carColor;
};

export const generateRandomCars = (carCount = 100): Array<AnyCar> =>
  new Array(carCount).fill(1).map(() => ({ name: getRandomCarName(), color: getRandomCarColor() }));
