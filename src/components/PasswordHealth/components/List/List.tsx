import { FC } from 'react';
import { IUserItem } from '~/types';
import ListItem from './components/ListItem';

import './list-style.scss';

interface IListProps {
  items: IUserItem[];
}

const List: FC<IListProps> = ({ items }) => (
  <ul className="list">
    {items.map((item) => (
      <ListItem key={item.title} item={item} />
    ))}
  </ul>
);

export default List;
