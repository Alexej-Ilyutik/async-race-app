import store from '../../services/store';
import { getStartEngine, getDriveStatus, getStopEngine } from '../../services/api';
import { getDistanceBtwElements, animation } from './animation';
import { Engine, DrivingStatus } from '../types';

export const startDriving = async (id: number): Promise<DrivingStatus> => {
  const startBtn = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
  startBtn.disabled = true;
  startBtn.classList.toggle('enabling', true);

  const { velocity, distance }: Engine = await getStartEngine(id);

  const time = Math.round(distance / velocity);

  startBtn.classList.toggle('enabling', false);

  const stopBtn = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
  stopBtn.disabled = false;

  const car = document.getElementById(`car-${id}`) as HTMLElement;
  const finish = document.getElementById(`finish-${id}`) as HTMLDivElement;
  const distanceBtwElem = Math.floor(getDistanceBtwElements(car, finish)) + 100;

  store.animation[id] = animation(car, distanceBtwElem, time);

  const { success } = await getDriveStatus(id);
  if (!success) window.cancelAnimationFrame(store.animation[id].id);

  return { success, id, time };
};

export const stopDriving = async (id: number): Promise<void> => {
  const stopBtn = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
  stopBtn.disabled = true;
  stopBtn.classList.toggle('enabling', true);

  await getStopEngine(id);

  stopBtn.classList.toggle('enabling', false);

  const startBtn = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
  startBtn.disabled = false;

  const car = document.getElementById(`car-${id}`) as HTMLElement;
  car.style.transform = 'translateX(0) translateY(20px)';
  if (store.animation[id]) window.cancelAnimationFrame(store.animation[id].id);
};
