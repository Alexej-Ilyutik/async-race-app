import { Cars, Car, AnyCar, Engine, Winner, Winners } from '../shared/types';

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

// race

export const getStartEngine = async (id: number): Promise<Engine> =>
  (
    await fetch(`${engine}?id=${id}&status=started`, {
      method: 'PATCH',
    })
  ).json();

export const getStopEngine = async (id: number): Promise<Engine> =>
  (
    await fetch(`${engine}?id=${id}&status=stopped`, {
      method: 'PATCH',
    })
  ).json();

export const getDriveStatus = async (id: number): Promise<{ success: boolean }> => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

// winner

const getSortOrder = (sort?: string | null, order?: string | null) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

export const getWinners = async ({
  page,
  limit = 10,
  sort,
  order,
}: {
  page: number;
  limit?: number;
  sort?: string | null;
  order?: string | null;
}): Promise<Winners> => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);

  const items = await response.json();

  return {
    items: await Promise.all(
      items.map(async (winner: Winner) => ({
        ...winner,
        car: await getCarById(winner.id.toString()),
      })),
    ),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id: number): Promise<Winner> => (await fetch(`${winners}/${id}`)).json();

export const getWinnerStatus = async (id: number): Promise<number> => (await fetch(`${winners}/${id}`)).status;

export const createWinner = async (body: Winner): Promise<void> =>
  (
    await fetch(`${winners}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const deleteWinner = async (id: number): Promise<void> =>
  (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const updateWinner = async (id: number, body: Winner): Promise<void> =>
  (
    await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const saveWinner = async ({ id, time }: { id: number; time: number }): Promise<void> => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
