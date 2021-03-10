import {Component} from "react";
import {Box, IconButton, Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import CartItem from "./CartItem";
import ClearIcon from '@material-ui/icons/Clear';

const styles = (theme: any) => ({
    root: {
        height: "60vh",
        overflow: "scroll",
        backgroundColor: theme.palette.background.paper
    },
    clearButton: {}
});

interface Props {
    cart: any,
    removeItemFromCart: any,
    removeAllItemFromCart: any,
    addItemToCart: any,
    removeAllCart: any,
    classes: any
}

class CartContainer extends Component<Props> {

    constructor(props: Readonly<Props> | Props) {
        super(props);
        this.state = {};
    }

    render() {
        const {cart} = this.props;
        const {classes}: any = this.props;
        const cartKeys = Object.keys(cart);

        const disable = Object.keys(cart).length === 0;

        return (
            <Box className={classes.root}>

                {
                    disable ?
                        <></> :
                        <IconButton onClick={this.props.removeAllCart} color={"secondary"}>
                            <ClearIcon/>
                        </IconButton>
                }
                <Grid container alignItems={"center"}>
                    {cartKeys.map(key => {
                        return <CartItem item={cart[key]} key={key} removeItemFromCart={this.props.removeItemFromCart}
                                         addItemToCart={this.props.addItemToCart}
                                         removeAllItemFromCart={this.props.removeAllItemFromCart}/>
                    })}
                </Grid>

            </Box>
        );
    }

}

export default withStyles(styles)(CartContainer);