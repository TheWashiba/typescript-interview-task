import { FC } from 'react';
import { useHistory } from 'react-router-dom';

interface IFilterTabProps {
  title: string;
  count: number;
  path: string;
}

const FilterTab: FC<IFilterTabProps> = ({ title, count, path }) => {
  const { push } = useHistory();

  return (
    <div className="filter-tab" onClick={() => push(path)}>
      {`${title} (${count})`}
    </div>
  );
};

export default FilterTab;
