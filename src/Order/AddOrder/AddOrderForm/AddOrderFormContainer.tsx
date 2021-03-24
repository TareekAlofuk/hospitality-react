import {Component} from "react";
import axios from "axios";
import {Endpoints} from "../../../Shared/Endpoints/Endpoints";
import {Box, IconButton, Snackbar} from "@material-ui/core";
import CartContainer from "../../Cart/CartContainer";
import {withStyles} from "@material-ui/core/styles";
import AddOrderForm from "./MetadataForm";
import {connect, ConnectedProps} from "react-redux";
import {setIsGuest, setNote} from "../../../Store/Action/OrderFormActions";
import {removeAllCart} from "../../../Store/Action/CartActions";
import {Close} from "@material-ui/icons";

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


const connector = connect((store: any) => {
    return {
        orderMetaData: store.orderFormReducer.metadata
    }
})
type ReduxProps = ConnectedProps<typeof connector>

const styles = (theme:any) => ({
    root: {
        height: "90vh",
        padding: '16px',
        overflow:"scroll"
    },
    input: {
        width: "100%",
    } ,
    message:{
        backgroundColor:theme.palette.primary.light
    }
});

class AddOrderFormContainer extends Component<Props & ReduxProps> {

    state = {
        postStatus: null,
        room: [],
        messageStatus: false,
        message:""
    }

    clearTheForm = () => {
        this.props.dispatch(setNote(""))
        this.props.dispatch(setIsGuest(false))
        this.props.dispatch(removeAllCart())
    }
    messageClose = () => {
        this.setState({messageStatus: false , message:""})
    }

    postOrder = async (cart: any[], metaData: metaData) => {
        try {
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
            this.setState({messageStatus: true , message:"تم ارسال طلبك بنجاح"})
        } catch (e) {
            this.setState({messageStatus: true , message:"عذرا .. لم يتم ارسال الطلب عاود المحاولة"})
        }

    }
    getRoom = async () => {
        try {
            const res = await axios.get(Endpoints.room.get)
            this.setState({room: res.data})
        } catch (e) {
            this.setState({messageStatus: true , message:"عذرا... لم يتم تحميل اسماء الغرف"})
        }

    }
    onSubmitOrder = async (event: any) => {
        event.preventDefault()
        const {cart} = this.props
        const metadata: metaData = {
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
            }
        } else {
            this.setState({messageStatus: true , message:"اضف على الاقل عنصر واحد لأتمام الطلب"})
        }


    }


    componentDidMount() {
        this.getRoom().then()
    }

    render() {
        const {classes} = this.props;
        return (
            <Box className={classes.root}>
                <CartContainer
                    cart={this.props.cart}
                    removeItemFromCart={this.props.removeItemFromCart}
                    addItemToCart={this.props.addItemToCart}
                    removeAllItemFromCart={this.props.removeAllItemFromCart}
                    removeAllCart={this.props.removeAllCart}
                />
                <AddOrderForm onSubmitOrder={this.onSubmitOrder} room={this.state.room}/>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    ContentProps={{
                        className: classes.message
                    }}
                    className={classes.message}
                    color={"primary"}
                    open={this.state.messageStatus}
                    autoHideDuration={4000}
                    transitionDuration={50}
                    onClose={this.messageClose}
                    message={this.state.message}
                    action={
                        <>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={this.messageClose}>
                                <Close fontSize="small"/>
                            </IconButton>
                        </>
                    }
                />
            </Box>
        );
    }
}


export default withStyles(styles)(connector(AddOrderFormContainer))