import { API } from '~/constants';
import { getUrl } from '~/utils';

export const login = async (username: string, password: string) => {
  const url = getUrl(API.Login, {
    username,
    password,
  });

  const response = await fetch(url);
  const data = await response.json();
  const { token } = data;

  localStorage.setItem('token', token);
};

export const logout = async () => {
  try {
    await fetch(getUrl(API.Logout), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  } finally {
    localStorage.removeItem('token');
  }
};
