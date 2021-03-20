import {ADD_ITEM_TO_CART} from "../Action/Types";
import {REMOVE_ITEM_FROM_CART} from "../Action/Types";
import {REMOVE_ALL_ITEM_FROM_CART} from "../Action/Types";
import {REMOVE_ALL_CART} from "../Action/Types";

const initialState = {
    cart:{}
}
export const cartReducers = (state: any = initialState, action: any) => {

    switch (action.type) {
        case ADD_ITEM_TO_CART: {
            const itemId = action.item._id;
            const existObjet = Object.fromEntries(
                Object.entries(state.cart).filter(
                    ([key, val]) => itemId.includes(key)
                )
            );
            if (Object.keys(existObjet).length > 0) {
                return {
                    cart: {
                        ...state.cart,
                        [itemId]: {
                            itemName:action.item.itemName,
                            _id:itemId,
                            count: state.cart[itemId].count + 1
                        }
                    }
                }
            }

            return {
                cart: {
                    ...state.cart,
                    [itemId]: {
                        itemName:action.item.itemName,
                        _id:itemId,
                        count: 1
                    }
                }

            }
        }
        case REMOVE_ITEM_FROM_CART: {
            const itemId = action.item._id;

            const item = action.item;

            if (item.count > 1) {
                console.log(action.item)

                return {

                    cart: {
                        ...state.cart,
                        [itemId]: {
                            itemName:action.item.itemName,
                            _id:itemId,
                            count: state.cart[itemId].count - 1
                        }
                    }
                }
            }

            if (item.count === 1) {
                const cart = {...state.cart}
                delete cart[itemId]
                return {
                    cart: cart
                }
            }
            return state

        }
        case REMOVE_ALL_ITEM_FROM_CART: {
            const itemId = action.item._id;
            const cart = {...state.cart}
            delete cart[itemId]
            return {
                cart: cart
            }
        }
        case REMOVE_ALL_CART :{
            return {
                cart: {}
            }
        }
        default: {
            return state
        }
    }
}