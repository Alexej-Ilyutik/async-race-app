import { Cars, Car } from '../shared/types';

const BASE_URL = 'http://localhost:3000';

const garage = `${BASE_URL}/garage`;
const engine = `${BASE_URL}/engine`;
const winners = `${BASE_URL}/winners`;

export const getCars = async (page: number, limit = 7): Promise<Cars> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getCarById = async (id: string): Promise<Car> => (await fetch(`${garage}/${id}`)).json();
