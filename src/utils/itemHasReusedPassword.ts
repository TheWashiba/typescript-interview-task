import { IUserItem } from '~/types';

const itemHasReusedPassword = (item: IUserItem, itemList: IUserItem[]) => {
  const reusedItems = itemList.filter(
    (listItem) => listItem.password === item.password
  );

  return reusedItems.length > 1;
};

export default itemHasReusedPassword;
