export interface IEndpoints {
    item_type: {
        get: string;
        add: string;
        delete: (id: string) => string;
        edit: (id: string) => string;
    }
    room: {
        get: string;
        add: string;
        delete: (id: string) => string;
        edit: (id: string) => string;
    }
}

function makeEndpoint(route: string): string {
    const baseUrl = "http://127.0.0.1:3100/api/";
    return `${baseUrl}${route}`
}

function makeEndpointWithId(route: string, id: string): string {
    const baseUrl = "http://127.0.0.1:3100/api/";
    return `${baseUrl}${route}${"/"}${id}`
}

export const Endpoints: IEndpoints = {
    item_type: {
        get: makeEndpoint("ItemType"),
        add: makeEndpoint("ItemType/Add"),
        delete: (id: string): string => {
            return makeEndpointWithId("ItemType/Delete", id)
        },
        edit: (id: string): string => {
            return makeEndpointWithId("ItemType/Update", id)
        },
    },
    room:{
        get: makeEndpoint("Room"),
        add: makeEndpoint("Room/Add"),
        delete: (id: string): string => {
            return makeEndpointWithId("Room/Delete", id)
        },
        edit: (id: string): string => {
            return makeEndpointWithId("Room/Update", id)
        },

    }
}