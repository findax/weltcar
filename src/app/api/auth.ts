import { createEffect } from 'effector-next';
import { toast } from 'react-hot-toast';
import { ISignUpFx, ISignInFx } from '@/data/auth';
import api from '../axiosClient';
import { AxiosError } from 'axios';

export const singUpFx = createEffect(
  async ({ url, username, password, email }: ISignUpFx) => {
    const { data } = await api.post(url, { username, password, email });

    if (data.warningMessage) {
      toast.error(data.warningMessage);
      return;
    }

    toast.success('Регистрация прощла успешно!');

    return data;
  }
);

export const singInFx = createEffect(
  async ({ url, username, password }: ISignInFx) => {
    const { data } = await api.post(url, { username, password });

    toast.success('Вход выполнен!');

    return data;
  }
);

export const checkUserAuthFx = createEffect(async (url: string) => {
  try {
    const { data } = await api.get(url);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      if (axiosError.response.status === 403) {
        return false;
      }
    }

    toast.error((error as Error).message);
  }
});

export const logoutFx = createEffect(async (url: string) => {
  try {
    await api.get(url);
  } catch (error) {
    toast.error((error as Error).message);
  }
});
