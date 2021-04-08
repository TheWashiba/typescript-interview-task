import { API } from '~/constants';
import { IUserItem } from '~/types';
import { getUrl } from '~/utils';

export const getUserItems = async (userId: string): Promise<IUserItem[]> => {
  const url = getUrl(API.Items, {
    userId,
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await response.json();

  return data.items;
};

export const updateUserItem = async (item: IUserItem) =>
  await fetch(getUrl(API.Items), {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
