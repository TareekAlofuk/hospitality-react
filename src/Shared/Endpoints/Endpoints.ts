export interface IEndpoints {
    item: {
        get: string;
        getActiveItems:string;
        add: string;
        delete: (id: string) => string;
        uploadImage:string
        edit: (id: string) => string;
        image : (name : string) => string;

    }
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
    },
    admin: {
        get: string;
        add: string;
        delete: (id: string) => string;
        edit: (id: string) => string;
    },
    Order: {
        get: string;
        add: string;
        delete: (id: string) => string;
        edit: (id: string) => string;
        UpdateStatus:(id:string)=>string
    }
}

function makeEndpoint(route: string): string {
    const baseUrl = "http://127.0.0.1:3100/api/";
    return `${baseUrl}${route}`
}

function makeFileUrl(route: string): string {
    const baseUrl = "http://127.0.0.1:3100/";
    return `${baseUrl}${route}`
}

function makeEndpointWithId(route: string, id: string): string {
    const baseUrl = "http://127.0.0.1:3100/api/";
    return `${baseUrl}${route}${"/"}${id}`
}

export const Endpoints: IEndpoints = {
    item: {
        get: makeEndpoint("Item"),
        getActiveItems:makeEndpoint("Item/ActiveItems"),
        add:makeEndpoint("Item/Add"),
        delete: (id: string): string => {
            return makeEndpointWithId("Item/Delete", id)
        },
        edit: (id: string): string => {
            return makeEndpointWithId("Item/Update", id)
        },
        uploadImage: makeEndpoint("Item/UploadImage"),
        image : name => makeFileUrl(`ItemImage/${name}`)
    },
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

    },
    admin:{
        get: makeEndpoint("Admin"),
        add: makeEndpoint("Admin/Add"),
        delete: (id: string): string => {
            return makeEndpointWithId("Admin/Delete", id)
        },
        edit: (id: string): string => {
            return makeEndpointWithId("Admin/Update", id)
        },

    } ,

    Order:{
        get: makeEndpoint("Order"),
        add: makeEndpoint("Order/Add"),
        delete: (id: string): string => {
            return makeEndpointWithId("Order/Delete", id)
        },
        edit: (id: string): string => {
            return makeEndpointWithId("Order/Update", id)
        },
        UpdateStatus: (id: string): string => {
            return makeEndpointWithId("Order/UpdateStatus", id)
        }
    }
}