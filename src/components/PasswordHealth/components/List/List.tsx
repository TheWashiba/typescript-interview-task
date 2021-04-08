import { FC, useState } from 'react';
import { useUserItemsContext } from '~/components/shared/UserItemsContext';
import { updateUserItem } from '~/services/userItems.services';
import { IUserItem } from '~/types';
import ListItem from './components/ListItem';
import PasswordUpdateModal from './components/PasswordUpdateModal';

import './List.scss';

interface IListProps {
  items: IUserItem[];
}

const List: FC<IListProps> = ({ items }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IUserItem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { updateUserItems } = useUserItemsContext();

  const handleListItemClick = async (item: IUserItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleUserItemUpdate = async (newPass: string) => {
    setErrorMessage('');

    if (selectedItem !== null) {
      try {
        await updateUserItem({
          ...selectedItem,
          password: newPass,
        });
        setShowModal(false);
        setSelectedItem(null);
        updateUserItems();
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <>
      <ul className="list">
        {items.map((item) => (
          <ListItem
            key={item.title}
            item={item}
            handleListItemClick={handleListItemClick}
          />
        ))}
      </ul>
      <PasswordUpdateModal
        showModal={showModal}
        errorMessage={errorMessage}
        setShowModal={setShowModal}
        handleUserItemUpdate={handleUserItemUpdate}
      />
    </>
  );
};

export default List;
