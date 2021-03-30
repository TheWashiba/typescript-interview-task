import { FC } from 'react';
import { Routes } from '~/constants';
import { IUserItem } from '~/types';
import {
  itemHasReusedPassword,
  itemHasWeakPassword,
  itemIsMonthOld,
} from '~/utils';
import FilterTab from './components/FilterTab';
import './filter-style.scss';

interface IFilterProps {
  items: IUserItem[];
}

const Filter: FC<IFilterProps> = ({ items }) => {
  const weakItemsCount = items.reduce(
    (count, item) => (itemHasWeakPassword(item) ? count + 1 : count),
    0
  );

  const reusedItemsCount = items.reduce(
    (count, item) => (itemHasReusedPassword(item, items) ? count + 1 : count),
    0
  );

  const oldItemsCount = items.reduce(
    (count, item) => (itemIsMonthOld(item) ? count + 1 : count),
    0
  );

  return (
    <div className="filter">
      <FilterTab title="Weak" count={weakItemsCount} path={Routes.Weak} />
      <FilterTab title="Reused" count={reusedItemsCount} path={Routes.Reused} />
      <FilterTab title="Old" count={oldItemsCount} path={Routes.Old} />
    </div>
  );
};

export default Filter;
