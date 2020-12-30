import { createStore } from "redux";
import data from '../data/data.json'

const SET_DATA = 'SET_DATA';
const DELETE_ITEM = 'DELETE_ITEM';

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

export default store;