import { IUserItem } from '~/types';
import ItemIcon from '../ItemIcon';

import './ListItem.scss';

interface IListItemProps {
  item: IUserItem;
  handleListItemClick: (item: IUserItem) => void;
}

const ListItem = ({ item, handleListItemClick }: IListItemProps) => (
  <li className="list-item">
    <ItemIcon title={item.title} />
    <div>
      <div className="list-item__title">{item.title}</div>
      <div className="list-item__description">{item.description}</div>
    </div>
    <button
      className="list-item__update-btn"
      onClick={() => handleListItemClick(item)}
    >
      Update Password
    </button>
  </li>
);

export default ListItem;
