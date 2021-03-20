import {SET_ROOM_ACTION_TYPE} from "../Action/OrderFormActions";
import {SET_NAME_ACTION_TYPE} from "../Action/OrderFormActions";
import {SET_NOTE_ACTION_TYPE} from "../Action/OrderFormActions";
import {SET_ISGUEST_ACTION_TYPE} from "../Action/OrderFormActions";

const initialState = {
    metadata : {
        roomName :localStorage.getItem("roomName"),
        name:localStorage.getItem("clientName"),
        note:"",
        isGust:false
    }

}
export const orderFormReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case SET_ROOM_ACTION_TYPE : return {...state , metadata:{ ...state.metadata , roomName : action.payload}};
        case SET_NAME_ACTION_TYPE : return {...state , metadata:{ ...state.metadata , name : action.payload}};
        case SET_NOTE_ACTION_TYPE : return {...state , metadata:{ ...state.metadata , note : action.payload}};
        case SET_ISGUEST_ACTION_TYPE : return {...state , metadata:{ ...state.metadata , isGust : action.payload}};
    }
    return state;
}