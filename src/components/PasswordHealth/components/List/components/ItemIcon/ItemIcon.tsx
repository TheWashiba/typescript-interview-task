import { FC } from 'react';

import './ItemIcon.scss';

interface IItemIconProps {
  title: string;
}

const ItemIcon: FC<IItemIconProps> = ({ title }) => (
  <div className="item-icon">{title.substring(0, 2)}</div>
);

export default ItemIcon;
