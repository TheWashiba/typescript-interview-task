import { FC, useMemo } from 'react';
import { Routes } from '~/constants';
import { IUserItem } from '~/types';
import {
  itemHasReusedPassword,
  itemHasWeakPassword,
  itemIsMonthOld,
} from '~/utils';
import FilterTab from './components/FilterTab';

import './Filter.scss';

interface IFilterProps {
  items: IUserItem[];
}

const Filter: FC<IFilterProps> = ({ items }) => {
  const weakItemsCount = useMemo(
    () =>
      items.reduce(
        (count, item) => (itemHasWeakPassword(item) ? count + 1 : count),
        0
      ),
    [items]
  );

  const reusedItemsCount = useMemo(
    () =>
      items.reduce(
        (count, item) =>
          itemHasReusedPassword(item, items) ? count + 1 : count,
        0
      ),
    [items]
  );

  const oldItemsCount = useMemo(
    () =>
      items.reduce(
        (count, item) => (itemIsMonthOld(item) ? count + 1 : count),
        0
      ),
    [items]
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
