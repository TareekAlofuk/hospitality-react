import {Component} from "react";
import {Box, Button, Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";


const styles = () => ({
    root: {
        backgroundColor: "#fff",
        padding: '10px',
        marginBottom: "10px"
    }
});

interface Props {
    item: any,
    removeItemFromCart: any,
    removeAllItemFromCart: any,
    addItemToCart: any,
    classes: any
}

class CartItem extends Component<Props> {
    removeItemFromCart = () => {
        const item = this.props.item;
        this.props.removeItemFromCart(item)
    }
    addItemToCart = () => {
        const item = this.props.item;
        this.props.addItemToCart(item);
    }
    removeAllItemFromCart = () => {
        const item = this.props.item;
        this.props.removeAllItemFromCart(item)
    }

    render() {
        const {itemName, count} = this.props.item
        const {classes} = this.props
        return (
            <Grid item md={12} className={classes.root}>
                <Box>
                    item name : {itemName}
                </Box>
                <Box>
                    count:{count}
                </Box>

                <Button
                    variant={"contained"}
                    onClick={this.removeItemFromCart}
                >
                    -
                </Button>
                <Button
                    variant={"contained"}
                    onClick={this.addItemToCart}
                >
                    +
                </Button>
                <Button
                    variant={"contained"}
                    onClick={this.removeAllItemFromCart}
                >
                    clear
                </Button>
            </Grid>
        );
    }
}

export default withStyles(styles)(CartItem)