import { IUserItem } from '~/types';
import { subDays } from 'date-fns';

const itemIs30DaysOld = (item: IUserItem) => {
  const monthAgo = subDays(new Date(), 30);
  const itemDate = new Date(item.createdAt);

  return itemDate < monthAgo;
};

export default itemIs30DaysOld;
