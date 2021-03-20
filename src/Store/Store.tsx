import {createStore} from "redux";
import {cartReducers} from "./Reducers/CartReducers";
import {orderFormReducer} from "./Reducers/OrderFormReducer";
import {combineReducers } from 'redux';


const reducers = {
    cartReducers ,
    orderFormReducer
}

const Store = createStore(combineReducers(reducers))
export default Store