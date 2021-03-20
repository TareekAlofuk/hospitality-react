import {ADD_ITEM_TO_CART, REMOVE_ALL_CART} from "./Types";
import {REMOVE_ITEM_FROM_CART} from './Types'
import {REMOVE_ALL_ITEM_FROM_CART} from './Types'

export const addItemToCart = (item: any) => {
    return {
        type: ADD_ITEM_TO_CART,
        item: item
    }
}

export const removeItemFromCart = (item: any) => {
    return {
        type: REMOVE_ITEM_FROM_CART,
        item: item
    }
}

export const removeAllItemFromCart = (item: any) => {
    return {
        type: REMOVE_ALL_ITEM_FROM_CART,
        item: item
    }
}

export const removeAllCart = () => {
    return {
        type: REMOVE_ALL_CART
    }
}