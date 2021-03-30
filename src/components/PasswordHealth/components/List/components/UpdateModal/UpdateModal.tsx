import React, { FC, useState } from 'react';
import Modal from 'react-modal';
import { useUserItemsContext } from '~/components/shared/UserItemsContext';
import ErrorBlock from '~/components/shared/ErrorBlock';
import { updateUserItem } from '~/services/userItems.services';
import { IUserItem } from '~/types';

interface IUpdateModalProps {
  item: IUserItem;
}

const UpdateModal: FC<IUpdateModalProps> = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [newPass, setNewPass] = useState('');
  const { updateUserItems } = useUserItemsContext();

  Modal.setAppElement('#app');

  const handleUserItemUpdate = async () => {
    setErrorMessage(null);

    try {
      await updateUserItem({
        ...item,
        password: newPass,
      });
      setNewPass('');
      setShowModal(false);
      updateUserItems();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <button className="update" onClick={() => setShowModal(true)}>
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
      >
        <h1>Update Password</h1>
        <input
          placeholder="new password"
          className="input"
          value={newPass}
          onChange={(event) => setNewPass(event.target.value)}
        />
        <ErrorBlock error={errorMessage} />
        <div className="pt-12px text-center">
          <button className="button" onClick={handleUserItemUpdate}>
            Change
          </button>
          <button
            className="button ml-12px"
            onClick={() => {
              setNewPass('');
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default UpdateModal;
