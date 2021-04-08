import { createContext, FC, useContext, useEffect, useState } from 'react';
import { getUserItems } from '~/services/userItems.services';
import { IUserItem } from '~/types';
import { useUserContext } from './UserContext';

interface IUserItemsContext {
  updateUserItems: () => void;
  isLoading: boolean;
  errorMessage: string;
  items: IUserItem[];
}

const UserItemsContext = createContext<IUserItemsContext>({
  updateUserItems: () => {},
  isLoading: false,
  errorMessage: '',
  items: [],
});

export const useUserItemsContext = () => useContext(UserItemsContext);

export const UserItemsContextProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [items, setItems] = useState<IUserItem[]>([]);
  const { id } = useUserContext();
  const updateUserItems = async () => {
    setIsLoading(true);

    try {
      const userItems = await getUserItems(id);

      setItems(userItems);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    updateUserItems();
  }, []);

  const value: IUserItemsContext = {
    updateUserItems,
    errorMessage,
    isLoading,
    items,
  };

  return (
    <UserItemsContext.Provider value={value}>
      {children}
    </UserItemsContext.Provider>
  );
};
