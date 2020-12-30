import { Button, Modal } from 'antd';
import { useState } from 'react';

function ModalAddNew(props) {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="Modal">
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        
      </Modal>
      <Button className='add-button' type='primary'
        onClick={showModal}>Добавить чек</Button>
    </div>
  );
}

export default ModalAddNew;
