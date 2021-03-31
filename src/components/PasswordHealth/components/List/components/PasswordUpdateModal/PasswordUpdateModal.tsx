import { FC, useState } from 'react';
import Modal from 'react-modal';
import ErrorBlock from '~/components/shared/ErrorBlock';

interface IPasswordUpdateModalProps {
  showModal: boolean;
  errorMessage: string;
  setShowModal: (val: boolean) => void;
  handleUserItemUpdate: (newPass: string) => void;
}

const PasswordUpdateModal: FC<IPasswordUpdateModalProps> = ({
  showModal,
  errorMessage,
  setShowModal,
  handleUserItemUpdate,
}) => {
  const [newPass, setNewPass] = useState('');

  const handleCancel = () => {
    setNewPass('');
    setShowModal(false);
  };

  return (
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
        <button
          className="button"
          onClick={() => handleUserItemUpdate(newPass)}
        >
          Change
        </button>
        <button className="button ml-12px" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

Modal.setAppElement('#app');

export default PasswordUpdateModal;
