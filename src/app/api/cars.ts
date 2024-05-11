import { createEffect } from 'effector-next';
import api from '../axiosClient';

export const getCarsListFx = createEffect(async (url: string) => {
  const { data } = await api.post(url);

  return data;
});

export const getCarDetailsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url);

  return data;
});
