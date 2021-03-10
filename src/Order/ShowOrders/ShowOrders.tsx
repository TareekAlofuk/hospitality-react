import {Component} from 'react'
import axios from "axios";
// import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import OrdersList from "./OrdersList";
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import {Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core";


const styles = (theme:any) => ({
    root: {
        paddingTop: "8vh",
        justifyContent: "center",
        overflow:'scroll',
        backgroundColor:theme.palette.background.default,
        height:"100vh"
    }
})

enum LoadingStatus {
    LOADING = 0,
    SUCCESS = 1,
    ERROR = 2,
}

interface Props {
    classes: any,
    auth:string,
    url:any
}

interface State {
    status: LoadingStatus,
    orders: any
}

class ShowOrders extends Component<Props> {

    state: State = {
        status: 0,
        orders: null
    }

    getOrders = async () => {
        try {
            const res = await axios.get(this.props.url.get);
            this.setState({orders: res.data, status: 1})
        } catch (e) {
            this.setState({orders: {}, status: 2})
        }
    }

    deleteOrder = async (_id: any) => {
        try {
            await axios.delete(this.props.url.delete(_id))
            const ordersAfterDelete = this.state.orders.filter((order: any) => order._id !== _id)
            this.setState({orders: ordersAfterDelete});
        } catch (e) {
            alert("حدث هنالك خطآ ما ")
        }
    }

    UpdateStatus = async (_id: any , newStatus:any) => {
        try {
            await axios.patch(this.props.url.UpdateStatus(_id) , {status:newStatus});
            const orders = this.state.orders.map((order:any)=> {
                if(order._id === _id){
                    order.status = newStatus
                }
                return order
            })

            this.setState({orders: orders });
        } catch (e) {
            alert("حدث هنالك خطآ ما ")
        }
    }

    async componentDidMount() {
        await this.getOrders()
    }

    render() {
        const {orders, status } = this.state
        const {classes , auth} = this.props;
        if (status === 0) {
            return <CircularProgress/>
        } else if (status === 1) {
            return (
                <Grid container className={classes.root}>
                    <OrdersList orders={orders} deleteOrder={this.deleteOrder} auth={auth} UpdateStatus={this.UpdateStatus}/>
                </Grid>
            );
        } else {
            return <Alert severity="error">there is an error !</Alert>
        }

    }


}

export default withStyles(styles)(ShowOrders)