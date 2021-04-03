import React, {Component} from "react";
import {Box, Button, CircularProgress, Dialog, Grid, IconButton, Slide, Snackbar, withWidth} from "@material-ui/core";
import AddOrderItems from "./AddOrderItems";
import {connect, ConnectedProps} from 'react-redux'
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import Axios from "axios";
import axios from "axios";
import {addItemToCart, removeAllCart, removeAllItemFromCart, removeItemFromCart} from "../../Store/Action/CartActions";
import AddOrderFormContainer from "./AddOrderForm/AddOrderFormContainer";
import InterfaceImageWithText from "../../helperComponents/InterfaceImageWithText";
import {setIsGuest, setNote} from "../../Store/Action/OrderFormActions";
import {Close} from "@material-ui/icons";
import {TransitionProps} from "@material-ui/core/transitions";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

const mapStateToProps = (store: any) => {
    return {
        cart: store.cartReducers.cart,
        orderMetaData: store.orderFormReducer.metadata
    }
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        addItemToCart: (item: any) => dispatch(addItemToCart(item)),
        removeItemFromCart: (item: any) => dispatch(removeItemFromCart(item)),
        removeAllItemFromCart: (item: any) => dispatch(removeAllItemFromCart(item)),
        removeAllCart: () => dispatch(removeAllCart()),
        setNote: (note: any) => dispatch(setNote(note)),
        setIsGuest: (isGust: any) => dispatch(setIsGuest(isGust)),
    }
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

interface Props extends RouteComponentProps {
    classes?: any,
    width: any,
    history: any
}

interface metaData {
    clientName: any,
    roomName: any,
    isGust: boolean,
    note: string,
    userId: any,
}

const styles = (theme: any) => ({
    root: {
        padding: "0",
        overflow: "hidden",
    },
    seeMore: {
        bottom: "0",
        left: "0",
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        alignItems: "center",
        justify: "center",
        width: "100vw",
    },

    backButtonContainer: {
        bottom: "0",
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        alignItems: "center",
        justify: "center",
        width: "100vw",
        color: "#fff",
    },

    backButton: {
        color: "#fff",
        flex: 1,
    },

    seeMoreButton: {
        color: "#fff",
        flex: 0.5
    },
    addButton: {
        color: "#fff",
        flex: 0.5
    },
    message:{
        backgroundColor:theme.palette.primary.light
    },

});

class AddOrderContainer extends Component<ReduxProps & Props> {
    state = {
        activeItems: [],
        loadItemsStatus: 'Loading',
        postStatus: null,
        room: [],
        messageStatus: false,
        message: "",
        openCart: false
    }

    getActiveItems = async () => {
        const apiUrl: string = Endpoints.item.getActiveItems;
        try {
            const response = await Axios.get(apiUrl);
            this.setState({activeItems: response.data, loadItemsStatus: 'Success'})

        } catch (e) {
            this.setState({activeItems: [], loadItemsStatus: 'Failed'})
        }
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
            this.setState({messageStatus: true, message: "تم ارسال طلبك بنجاح ...سيتم تحويلك الى الطلبات "})
            setTimeout(()=>{this.props.history.push('/Order')}, 2000)
        } catch (e) {
            this.setState({messageStatus: true, message: "عذرا .. لم يتم ارسال الطلب عاود المحاولة"})
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
            this.setState({messageStatus: true, message: "اضف على الاقل عنصر واحد لأتمام الطلب"})
        }


    }
    messageClose = () => {
        this.setState({messageStatus: false, message: ""})
    }
    clearTheForm = () => {
        this.props.setNote('')
        this.props.setIsGuest(false)
        this.props.removeAllCart()
    }
    getRoom = async () => {
        try {
            const res = await axios.get(Endpoints.room.get)
            this.setState({room: res.data})
        } catch (e) {
            this.setState({messageStatus: true, message: "عذرا... لم يتم تحميل اسماء الغرف"})
        }

    }
    handleClickOpenCart = () => {
        this.setState({openCart: true});
    };

    handleCloseCart = () => {
        this.setState({openCart: false});
    };


    componentDidMount() {
        this.getActiveItems().then()
        this.getRoom().then()

    }


    render() {
        const {classes, width} = this.props
        const isMobile = width === 'xs' || width === 'sm'
        const displayForPc = isMobile ? "none" : ""
        const displayForMobile = isMobile ? "" : "none"

        if (this.state.loadItemsStatus === 'Loading') {
            return <CircularProgress color="primary"/>
        } else if (this.state.loadItemsStatus === 'Success') {
            return (<>
                    <Grid container justify={"center"} alignItems={'flex-start'} className={classes.root}>
                        <Grid item md={4}>
                            <AddOrderFormContainer
                                cart={this.props.cart}
                                removeItemFromCart={this.props.removeItemFromCart}
                                addItemToCart={this.props.addItemToCart}
                                removeAllItemFromCart={this.props.removeAllItemFromCart}
                                removeAllCart={this.props.removeAllCart}
                                onSubmitOrder={this.onSubmitOrder}
                                room={this.state.room}
                                display={displayForPc}
                            />
                        </Grid>
                        <Grid item md={8}>
                            <AddOrderItems activeItems={this.state.activeItems} addItemToCart={this.props.addItemToCart}
                                           removeItemFromCart={this.props.removeItemFromCart}
                                           removeAllItemFromCart={this.props.removeAllItemFromCart}
                                           cart={this.props.cart}/>
                        </Grid>


                    </Grid>
                    {isMobile ?
                        <Box className={classes.seeMore} position={"absolute"}>
                            <Button className={classes.seeMoreButton} onClick={this.handleClickOpenCart}>
                                عرض السلة
                            </Button>
                            <Button className={classes.addButton} onClick={this.onSubmitOrder}>
                                ارسال الطلب
                            </Button>
                        </Box> : ""
                    }
                    <Dialog fullScreen open={this.state.openCart} onClose={this.handleCloseCart}
                            TransitionComponent={Transition} dir={"rtl"}>
                        <AddOrderFormContainer
                            cart={this.props.cart}
                            removeItemFromCart={this.props.removeItemFromCart}
                            addItemToCart={this.props.addItemToCart}
                            removeAllItemFromCart={this.props.removeAllItemFromCart}
                            removeAllCart={this.props.removeAllCart}
                            onSubmitOrder={this.onSubmitOrder}
                            room={this.state.room}
                            display={displayForMobile}
                        />
                        <Box className={classes.backButtonContainer} position={"sticky"}>
                            <Button className={classes.backButton} onClick={this.handleCloseCart}
                                    color={"default"}>رجوع</Button>
                        </Box>
                    </Dialog>

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
                        autoHideDuration={2000}
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
                </>
            );
        }
    else
        {
            return <InterfaceImageWithText imageSrc={"img/warning.svg"} textUnderImage={" نأسف... يبدو ان هنالك خطآ"}
                                           imageAlt={"خطر"}/>
        }
    }
    }

    export default  withWidth()(withStyles(styles)(connector(withRouter(AddOrderContainer))))