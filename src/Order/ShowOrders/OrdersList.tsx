import React, {Component} from 'react';
import OrderCard from "./OrderCard";


interface Props {
    orders:any,
    deleteOrder:any,
    auth:any,
    UpdateStatus:any
}
class OrdersList extends Component<Props> {

    render(): any {
        const  {orders , deleteOrder , auth , UpdateStatus} = this.props
        return orders.slice(0).reverse().map((order: any) => {
            return <OrderCard order={order} deleteOrder={deleteOrder} key={order._id}  auth={auth} UpdateStatus={UpdateStatus}/>
        })
    }

}

export default OrdersList