export interface IEndpoints {
    item_type : {
        get:string;
        add : string;
        delete:any
    }
}
function makeEndpoint(route : string) : string {
    const baseUrl = "http://127.0.0.1:3100/api/";
    return `${baseUrl}${route}`
}
function makeEndpointWithId(route : string , id:string) : string {
    const baseUrl = "http://127.0.0.1:3100/api/";
    return `${baseUrl}${route}${"/"}${id}`
}

export const Endpoints : IEndpoints = {
    item_type : {
        get:makeEndpoint("ItemType"),
        add: makeEndpoint("ItemType/Add"),
        delete: (id:string):string => {
            return makeEndpointWithId("ItemType/Delete" , id)
        },
    }
}