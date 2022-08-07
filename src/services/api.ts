import { Cars, Car, AnyCar } from '../shared/types';

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

export const getCreateCar = async (car: { name: string; color: string }): Promise<Response> =>
  (
    await fetch(`${garage}`, {
      method: 'POST',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const updateCar = async (id: number, body: AnyCar): Promise<void> =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const deleteCarById = async (id: number): Promise<Car> =>
  (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();
