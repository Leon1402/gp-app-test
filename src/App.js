import { connect } from 'react-redux';
import { getDataFromJson, deleteItem, addNewCheque } from './redux/redux';
import './App.css';
import Table from './Table/Table';
import { useState } from 'react';
import ModalAddNew from './ModalAddNew/ModalAddNew';
import { Button } from 'antd';

function App(props) {

  const [visible, setVisible] = useState(false);

  if (!props.state.initialized) {
    props.getDataFromJson();
    return <div>Загрузка</div>
  }
  const onCreate = (values) => {
    let newCheque = {
      chequeType: values.chequeType[0],
      dateReg: values.dateReg.toDate(),
      kioskName: values.kioskName[0],
      sum: values.sum.toFixed(2) * 100,
      pays: [{sum: values.pays.toFixed(2) * 100}],
      positions: [{name: values.positions, quantity: 1}]
    }
    setVisible(false);
    props.addNewCheque(newCheque);
  };

  return (
    <div className="App">
      <Table data={props.state.data} deleteItem={props.deleteItem} />
      <ModalAddNew 
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}/>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}>Добавить новый чек</Button>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps, { getDataFromJson, deleteItem, addNewCheque })(App);
