import {Component} from 'react'
import axios from "axios";
import OrdersList from "./OrdersList";
import CircularProgress from '@material-ui/core/CircularProgress';
import {Box, Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core";
import SocketIO from "socket.io-client";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import InterfaceImageWithText from "../../helperComponents/InterfaceImageWithText";

const styles = (theme: any) => ({
    root: {
        overflow:"scroll",
        marginTop: "8vh",
    },

    emptyContainer: {
        height: "93vh",
        width: "100vw"
    }


})

enum LoadingStatus {
    LOADING = 0,
    SUCCESS = 1,
    ERROR = 2,
}

interface Props {
    classes: any,
    auth: string,
    getUrl: any,
    deleteUrl: any,
    updateUrl: any
}

interface State {
    status: LoadingStatus,
    orders: any
}


class ShowOrders extends Component<Props> {

    state: State = {
        status: 0,
        orders: []
    }

    private socket: SocketIOClient.Socket | null = null;

    getOrders = async () => {
        try {
            const res = await axios.get(this.props.getUrl);
            this.setState({orders: res.data, status: 1});
            this.socket = SocketIO(Endpoints.root);

            this.socket.on('NEW_ORDER', (data: any) => {
                const orders = [ ...this.state.orders ,data];
                this.setState({orders: orders});
            });

            this.socket.on('ORDER_STATUS_CHANGED', (data: any) => {
                const orders = this.state.orders.map((order: any) => {
                    if (order._id === data._id) {
                        order.status = data.newStatus
                    }
                    return order
                })
                this.setState({orders: orders});
            });

            this.socket.on('ORDER_CANCELED', (data: any) => {
                const orders = this.state.orders.filter((order: any) => order._id !== data._id)
                this.setState({orders: orders});
            });


        } catch (e) {
            console.log(e);
            this.setState({orders: {}, status: 2})
        }
    }

    deleteOrder = async (_id: any) => {
        try {
            await axios.delete(this.props.deleteUrl(_id))
            const ordersAfterDelete = this.state.orders.filter((order: any) => order._id !== _id)
            this.setState({orders: ordersAfterDelete});
        } catch (e) {
            alert("حدث هنالك خطآ ما ")
        }
    }

    UpdateStatus = async (_id: any, newStatus: any) => {
        try {
            await axios.patch(this.props.updateUrl(_id), {status: newStatus});
            const orders = this.state.orders.map((order: any) => {
                if (order._id === _id) {
                    order.status = newStatus
                }
                return order
            })
            this.setState({orders: orders});
        } catch (e) {
            alert("حدث هنالك خطآ ما ")
        }
    }

    async componentDidMount() {
        await this.getOrders()
    }

    componentWillUnmount() {
        if (this.socket) {
            this.socket.close();
        }
    }

    render() {
        const {orders, status} = this.state
        const {classes, auth} = this.props;

        if (status === 0) {
            return <CircularProgress/>
        } else if (orders.length === 0) {
            return  <InterfaceImageWithText imageSrc={"img/emptyOrder.svg"} textUnderImage={"ليست هنالك اي طلبات"}
                                imageAlt={"لا توجد طلبات"}/>
        } else if (status === 1) {
            return (
                    <Grid container item className={classes.root} justify={"center"}>
                        <OrdersList orders={orders} deleteOrder={this.deleteOrder} auth={auth}
                                    UpdateStatus={this.UpdateStatus}/>
                    </Grid>
            );
        } else {
            return <InterfaceImageWithText imageSrc={"img/warning.svg"} textUnderImage={" نأسف... يبدو ان هنالك خطآ"}
                                imageAlt={"خطر"}/>
        }

    }


}

export default withStyles(styles)(ShowOrders)