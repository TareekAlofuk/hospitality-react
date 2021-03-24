import {Component} from "react";
import {Box, Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import OrderItem from "./OrderItem";


const styles = (theme:any) => ({
    root: {
        backgroundColor:theme.palette.grey[50],
        height: "90vh",
        overflow: 'scroll',
        padding: '16px'
    }
});

interface Props {
    activeItems: any,
    addItemToCart: any,
    removeItemFromCart: any,
    removeAllItemFromCart: any,
    cart: any,
    classes: any
}

class AddOrderItems extends Component<Props> {

    render() {
        const {classes}: any = this.props;

        return (
            <Box className={classes.root}>
                <Grid container spacing={2}>
                    {
                        this.props.activeItems.map((item: any, index: any) => {
                            const itemCount = this.props.cart[item._id] ? this.props.cart[item._id].count : 0
                            return (
                                <OrderItem key={index} item={item} addItemToCart={this.props.addItemToCart}
                                           removeItemFromCart={this.props.removeItemFromCart}
                                           removeAllItemFromCart={this.props.removeAllItemFromCart} count={itemCount}/>
                            )
                        })
                    }

                </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(AddOrderItems)