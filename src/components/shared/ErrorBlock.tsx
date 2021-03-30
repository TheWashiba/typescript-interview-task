import { FC, memo } from 'react';

interface IErrorBlockProps {
  error: string;
}

const ErrorBlock: FC<IErrorBlockProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return <div>{error}</div>;
};

export default memo(ErrorBlock);
