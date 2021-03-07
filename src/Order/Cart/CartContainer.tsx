import {Component} from "react";
import {Box, Button, Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import CartItem from "./CartItem";


const styles = () => ({
    root: {}
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
                <Grid container>
                    {cartKeys.map(key => {
                        return <CartItem item={cart[key]} key={key} removeItemFromCart={this.props.removeItemFromCart}
                                         addItemToCart={this.props.addItemToCart}
                                         removeAllItemFromCart={this.props.removeAllItemFromCart}/>
                    })}
                </Grid>
                {

                    <Button disabled={disable} onClick={this.props.removeAllCart} variant={"contained"}>
                        Clear
                    </Button>
                }
            </Box>
        );
    }

}

export default withStyles(styles)(CartContainer);