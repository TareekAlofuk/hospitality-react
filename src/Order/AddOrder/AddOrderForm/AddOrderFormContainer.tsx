import {Component} from "react";
import axios from "axios";
import {Endpoints} from "../../../Shared/Endpoints/Endpoints";
import {Box} from "@material-ui/core";
import CartContainer from "../../Cart/CartContainer";
import {withStyles} from "@material-ui/core/styles";
import AddOrderForm from "./MetadataForm";
import {connect, ConnectedProps} from "react-redux";
import {setIsGuest, setName, setNote, setRoom} from "../../../Store/Action/OrderFormActions";
import {removeAllCart} from "../../../Store/Action/CartActions";

interface Props {
    cart: any,
    removeItemFromCart: any,
    removeAllItemFromCart: any,
    addItemToCart: any,
    removeAllCart: any,
    classes?: any
}

interface metaData {
    clientName: any,
    roomName: any,
    isGust: boolean,
    note: string,
    userId: any,
}



const connector = connect((store:any) => {
    return {
        orderMetaData : store.orderFormReducer.metadata
    }
})
type ReduxProps = ConnectedProps<typeof connector>

const styles = () => ({
    root: {
        height: "100vh",
        padding: '16px'
    },
    input: {
        width: "100%",
    }
});

class AddOrderFormContainer extends Component<Props&ReduxProps> {

    state = {
        postStatus: null,
        room: []
    }

    clearTheForm = () => {

        this.props.dispatch(setName(""))
        this.props.dispatch(setRoom(""))
        this.props.dispatch(setNote(""))
        this.props.dispatch(setIsGuest(false))
        this.props.dispatch(removeAllCart())

    }

    postOrder = async (cart: any[], metaData: metaData) => {

        await axios.post(Endpoints.Order.add, {
            items: cart,
            client: {
                clientName: metaData.clientName,
                roomName: metaData.roomName,
            },
            note: metaData.note,
            isGust: metaData.isGust,
            userId: metaData.userId
        })
    }
    getRoom = async () => {
        try {
            const res = await axios.get(Endpoints.room.get)
            this.setState({room: res.data})
        } catch (e) {
            alert("Can not load room names")
        }

    }
    onSubmitOrder = async (event: any) => {
        event.preventDefault()
        const {cart} = this.props
        const metadata:metaData = {
            clientName: this.props.orderMetaData.name,
            roomName: this.props.orderMetaData.roomName,
            isGust: this.props.orderMetaData.isGust,
            note: this.props.orderMetaData.note,
            userId: localStorage.getItem('userId')
        }
        const cartInArray: any[] = Object.keys(cart).map((key: any) => {
            return cart[key]
        });

        if (cartInArray.length > 0) {

            try {
                await this.postOrder(cartInArray, metadata);
                this.props.removeAllCart()
                this.clearTheForm()
                this.setState({postStatus: true})
            } catch (e) {
                this.setState({postStatus: false})
                console.log("there is an error " + e)
            }
        } else {
            alert("Add at lest one item")
        }


    }


    componentDidMount() {
        this.getRoom().then()
    }

    render() {
        const {classes} = this.props ;
        return (
            <Box className={classes.root}>
                <CartContainer
                    cart={this.props.cart}
                    removeItemFromCart={this.props.removeItemFromCart}
                    addItemToCart={this.props.addItemToCart}
                    removeAllItemFromCart={this.props.removeAllItemFromCart}
                    removeAllCart={this.props.removeAllCart}
                />
                <AddOrderForm onSubmitOrder={this.onSubmitOrder}  room={this.state.room}/>
            </Box>
        );
    }
}


export default withStyles(styles)(connector(AddOrderFormContainer))