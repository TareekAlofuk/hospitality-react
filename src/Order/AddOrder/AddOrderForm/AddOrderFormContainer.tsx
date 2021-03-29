import {Component} from "react";
import {Box} from "@material-ui/core";
import CartContainer from "../../Cart/CartContainer";
import {withStyles} from "@material-ui/core/styles";
import AddOrderForm from "./MetadataForm";
import {connect, ConnectedProps} from "react-redux";
import {withWidth} from "@material-ui/core";
interface Props {
    cart: any,
    removeItemFromCart: any,
    removeAllItemFromCart: any,
    addItemToCart: any,
    removeAllCart: any,
    classes: any,
    width:any,
    onSubmitOrder:any,
    room:any,
    display:any
}




const connector = connect((store: any) => {
    return {
        orderMetaData: store.orderFormReducer.metadata
    }
})
type ReduxProps = ConnectedProps<typeof connector>

const styles = (theme:any) => ({
    root: {
        height:"90vh",
        padding: '16px',
        overflow:"scroll",
    },
    input: {
        width: "100%",
    } ,
    message:{
        backgroundColor:theme.palette.primary.light
    },

});

class AddOrderFormContainer extends Component<Props & ReduxProps> {

    state = {

        messageStatus: false,
        message:""
    }

    render() {
        const {classes , width , display} = this.props;
        const isMobile = width === 'xs' || width === 'sm'
        return (
            <Box className={classes.root} style={{scrollbarWidth:'none' , scrollbarColor:"#f1f1f1"}} display={display}>
                <CartContainer
                    cart={this.props.cart}
                    removeItemFromCart={this.props.removeItemFromCart}
                    addItemToCart={this.props.addItemToCart}
                    removeAllItemFromCart={this.props.removeAllItemFromCart}
                    removeAllCart={this.props.removeAllCart}
                />
                <AddOrderForm onSubmitOrder={this.props.onSubmitOrder} room={this.props.room}/>
            </Box>
        );
    }
}


export default withWidth()( withStyles(styles)(connector(AddOrderFormContainer)))