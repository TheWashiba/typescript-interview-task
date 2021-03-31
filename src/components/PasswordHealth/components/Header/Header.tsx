import { FC, useContext } from 'react';
import { useHistory } from 'react-router';
import UserContext from '~/components/shared/UserContext';
import { Routes } from '~/constants';
import { logout } from '~/services/auth.services';
import { IUserItem } from '~/types';

import './header-style.scss';

interface IHeaderProps {
  items: IUserItem[];
  username: string;
}

const Header: FC<IHeaderProps> = ({ items, username }) => {
  const { replace } = useHistory();
  const { deleteData } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      deleteData();
      replace(Routes.Login);
    }
  };

  return (
    <div className="header">
      <div className="user-section">
        <button onClick={handleLogout}>{`Logout ${username}`}</button>
      </div>
      <h1>{`${items.length} Items are vulnerable`}</h1>
      <span>Create new complex passwords to protect your accounts</span>
    </div>
  );
};

export default Header;
