import { connect } from 'react-redux';
import {getDataFromJson, deleteItem} from './redux/redux'
import './App.css';
import Table from './Table/Table';

function App(props) {
  if(!props.state.initialized)
  {
    props.getDataFromJson();
    return <div>Загрузка</div>
  }
  return (
    <div className="App">
      <Table data={props.state.data} deleteItem={props.deleteItem}/>
      <button>добавить покупку</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps, {getDataFromJson, deleteItem})(App);
