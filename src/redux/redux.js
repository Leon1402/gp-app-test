import { createStore } from "redux";
import data from '../data/data.json'

const SET_DATA = 'SET_DATA';
const DELETE_ITEM = 'DELETE_ITEM';
const ADD_NEW_CHEQUE = 'ADD_NEW_CHEQUE';

let initState = {
    initialized: false
}

let dataStore = (state = initState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.data,
                initialized: true
            }
        case DELETE_ITEM:
            return {
                ...state,
                data: [...state.data.filter((item, index) => 
                    action.index.indexOf(index) === -1
                )]
            }
        case ADD_NEW_CHEQUE:
            return {
                ...state,
                data: [
                    ...state.data, action.data
                ] 
            }
        default:
            return state;
    }
}

let store = createStore(dataStore);

export const getDataFromJson = () => {
    return {type: SET_DATA, data: data.data.cheques}
}

export const deleteItem = index => {
    return {type: DELETE_ITEM, index}
}

export const addNewCheque = data => {
    return {type: ADD_NEW_CHEQUE, data}
}

export default store;