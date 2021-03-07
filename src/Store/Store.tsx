import {createStore} from "redux";
import {cartReducers} from "./Reducers/CartReducers";

const initialState = {
    cart:{}
}

const Store = createStore(cartReducers, initialState)
export default Store