import { IUserItem } from '~/types';
import ItemIcon from '../ItemIcon';
import UpdateModal from '../UpdateModal';

interface IListItemProps {
  item: IUserItem;
}

const ListItem = ({ item }: IListItemProps) => (
  <li className="item">
    <ItemIcon title={item.title} />
    <div>
      <div className="title">{item.title}</div>
      <div className="description">{item.description}</div>
    </div>
    <UpdateModal item={item} />
  </li>
);

export default ListItem;
