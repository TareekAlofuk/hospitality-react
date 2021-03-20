export const SET_ROOM_ACTION_TYPE = "ORDER_FORM_SET_ROOM_TYPE";
export const SET_NAME_ACTION_TYPE = "ORDER_FORM_SET_NAME_TYPE";
export const SET_NOTE_ACTION_TYPE = "ORDER_FORM_SET_NOTE_TYPE";
export const SET_ISGUEST_ACTION_TYPE = "ORDER_FORM_SET_ISGUEST_TYPE";

export function setRoom(roomNumber: string) {
    return {
        type: SET_ROOM_ACTION_TYPE,
        payload: roomNumber
    }
}

export function setName(name: string) {
    return {
        type: SET_NAME_ACTION_TYPE,
        payload: name
    }
}

export function setNote(note: string) {
    return {
        type: SET_NOTE_ACTION_TYPE,
        payload: note
    }
}

export function setIsGuest(isGust: boolean) {
    return {
        type: SET_ISGUEST_ACTION_TYPE,
        payload: isGust
    }
}