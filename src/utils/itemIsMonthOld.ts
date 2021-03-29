import { IUserItem } from '~/types';

const itemIsMonthOld = (item: IUserItem) => {
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  const itemDate = new Date(item.createdAt);

  return itemDate < monthAgo;
};

export default itemIsMonthOld;
