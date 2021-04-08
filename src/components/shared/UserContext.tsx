import { createContext, FC, useContext, useEffect, useState } from 'react';
import { API } from '~/constants';
import getUrl from '~/utils/getUrl';

interface IUserContext {
  updateUser: () => void;
  deleteData: () => void;
  errorMessage: string;
  isLoading: boolean;
  username: string;
  email: string;
  id: string;
}

const UserContext = createContext<IUserContext>({
  updateUser: () => {},
  deleteData: () => {},
  errorMessage: '',
  isLoading: true,
  username: '',
  email: '',
  id: '',
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: FC = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [id, setId] = useState<string>('');

  const updateUser = async () => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(getUrl(API.User), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      setUsername(data?.username);
      setEmail(data?.email);
      setId(data?.id);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  const deleteData = () => {
    setErrorMessage('');
    setIsLoading(false);
    setUsername('');
    setEmail('');
    setId('');
  };

  useEffect(() => {
    updateUser();
  }, []);

  const value: IUserContext = {
    updateUser,
    deleteData,
    errorMessage,
    isLoading,
    username,
    email,
    id,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
