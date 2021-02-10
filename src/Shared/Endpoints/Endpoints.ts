export interface IEndpoints {
    item_type : {
        add : string;
    }
}

function makeEndpoint(route : string) : string {
    const baseUrl = "http://127.0.0.1:3100/api/";
    return `${baseUrl}${route}`
}

export const Endpoints : IEndpoints = {
    item_type : {
        add: makeEndpoint("ItemType/Add")
    }
}