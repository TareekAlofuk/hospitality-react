export interface IEndpoints {
    root: string;
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
        login:string;
        delete: (id: string) => string;
        edit: (id: string) => string;
    },
    Order: {
        get: string;
        getClientOrder: (id: any) => string;
        add: string;
        delete: (id: string) => string;
        edit: (id: string) => string;
        UpdateStatus:(id:string)=>string ;
        showUnderwayOrder:string;
        showWaitingOrder:string;
    },
    report:{
        AllClientsReport:any
        ReportByMonth:(month:number)=>string
        MonthlyCompleteReport:(month:number)=>string
        RequestedItemsByClients:(month:number)=>string
    }

}

// function root() {
//     return "http://192.168.20.10:3100";
// }
// function makeEndpoint(route: string): string {
//     const baseUrl = "http://192.168.20.10:3100/api/";
//     return `${baseUrl}${route}`
// }

// function makeFileUrl(route: string): string {
//     const baseUrl = "http://192.168.20.10:3100/";
//     return `${baseUrl}${route}`
// }

// function makeEndpointWithData(route: string, date: any): string {
//     const baseUrl = "http://192.168.20.10:3100/api/";
//     return `${baseUrl}${route}${"/"}${date}`
// }

function root() {
    return "http://127.0.0.1:3100";
}

function makeEndpoint(route: string): string {
    const baseUrl = "http://127.0.0.1:3100/api/";
    return `${baseUrl}${route}`
}

function makeFileUrl(route: string): string {
    const baseUrl = "http://127.0.0.1:3100/";
    return `${baseUrl}${route}`
}

function makeEndpointWithData(route: string, data: any): string {
    const baseUrl = "http://127.0.0.1:3100/api/";
    return `${baseUrl}${route}${"/"}${data}`
}

export const Endpoints: IEndpoints = {
    root : root(),
    item: {
        get: makeEndpoint("Item"),
        getActiveItems:makeEndpoint("Item/ActiveItems"),
        add:makeEndpoint("Item/Add"),
        delete: (id: string): string => {
            return makeEndpointWithData("Item/Delete", id)
        },
        edit: (id: string): string => {
            return makeEndpointWithData("Item/Update", id)
        },
        uploadImage: makeEndpoint("Item/UploadImage"),
        image : name => makeFileUrl(`ItemImage/${name}`)
    },
    item_type: {
        get: makeEndpoint("ItemType"),
        add: makeEndpoint("ItemType/Add"),
        delete: (id: string): string => {
            return makeEndpointWithData("ItemType/Delete", id)
        },
        edit: (id: string): string => {
            return makeEndpointWithData("ItemType/Update", id)
        },
    },
    room:{
        get: makeEndpoint("Room"),
        add: makeEndpoint("Room/Add"),
        delete: (id: string): string => {
            return makeEndpointWithData("Room/Delete", id)
        },
        edit: (id: string): string => {
            return makeEndpointWithData("Room/Update", id)
        },

    },
    admin:{
        get: makeEndpoint("Admin"),
        add: makeEndpoint("Admin/Add"),
        login:makeEndpoint("Admin/Login"),
        delete: (id: string): string => {
            return makeEndpointWithData("Admin/Delete", id)
        },
        edit: (id: string): string => {
            return makeEndpointWithData("Admin/Update", id)
        },

    } ,

    Order:{
        get: makeEndpoint("Order"),
        getClientOrder:(userId: string): string => {
            return makeEndpointWithData("Order/showClientOrders", userId)
        },
        add: makeEndpoint("Order/Add"),
        delete: (id: string): string => {
            return makeEndpointWithData("Order/Delete", id)
        },
        edit: (id: string): string => {
            return makeEndpointWithData("Order/Update", id)
        },
        UpdateStatus: (id: string): string => {
            return makeEndpointWithData("Order/UpdateStatus", id)
        },
        showUnderwayOrder:makeEndpoint("Order/Underway"),
        showWaitingOrder:makeEndpoint(("Order/Waiting"))
    } ,
    report:{
        AllClientsReport:makeEndpoint('Order/AllClientsReport'),
        ReportByMonth: (month:number): string => {
            return makeEndpointWithData('Order/ReportByMonth', month)
        },
        MonthlyCompleteReport: (month:number): string => {
            return makeEndpointWithData('Order/MonthlyCompleteReport', month)
        },
        RequestedItemsByClients: (month:number): string => {
            return makeEndpointWithData('Order/RequestedItemsByClients', month)
        }
    }
}