import { connect } from 'react-redux';
import { getDataFromJson, deleteItem } from './redux/redux';
import './App.css';
import Table from './Table/Table';
import { useState } from 'react';
import ModalAddNew from './ModalAddNew/ModalAddNew';

function App(props) {

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!props.state.initialized) {
    props.getDataFromJson();
    return <div>Загрузка</div>
  }


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
    <div className="App">
      <Table data={props.state.data} deleteItem={props.deleteItem} />
      <ModalAddNew />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps, { getDataFromJson, deleteItem })(App);
