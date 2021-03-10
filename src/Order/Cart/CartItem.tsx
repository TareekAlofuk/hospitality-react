import {Component} from "react";
import {Box, Button, Grid, ButtonGroup, IconButton, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Minimize';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const styles = () => ({
    root: {
        backgroundColor: "#fff",
        padding: '10px',
        marginBottom: "10px"
    },
    count:{
        color:'#C0C0C0'
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
            <Grid item container justify={"center"} alignItems={"center"} className={classes.root}>
                <Grid item md={12}>
                    <Typography variant={"h5"} align={"center"}>
                        {itemName}
                    </Typography>
                </Grid>
                <Grid md={12}>
                    <Box>
                        <Typography className={classes.count} variant={"h5"} align={"center"}>
                            {count}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item container justify={"center"} md={12}>
                    <Grid item md={2}>
                        <IconButton
                            onClick={this.removeItemFromCart}
                        >
                            <MinimizeIcon/>
                        </IconButton>
                    </Grid>

                    <Grid item md={2}>
                        <IconButton
                            onClick={this.addItemToCart}
                        >
                            <AddIcon/>
                        </IconButton>
                    </Grid>

                    <Grid item md={2}>
                        <IconButton
                            onClick={this.removeAllItemFromCart}
                            color={"secondary"}
                        >
                            <DeleteOutlineIcon/>
                        </IconButton>
                    </Grid>

                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(CartItem)