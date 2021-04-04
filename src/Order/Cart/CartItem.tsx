import {Component} from "react";
import {Box, Button, Grid, IconButton, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Minimize';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {Remove} from "@material-ui/icons";

const styles = () => ({
    root: {
        backgroundColor: "#fff",
        padding: '10px',
        marginBottom: "10px"
    },
    count:{
        color:'#C0C0C0'
    },
    icons:{
        fontSize:'20px'
    },
    button:{
        minWidth:"0"
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
                <Grid item md={12} xs={12}>
                    <Typography variant={"h5"} align={"center"}>
                        {itemName}
                    </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Box>
                        <Typography className={classes.count} variant={"h5"} align={"center"}>
                            {count}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item container justify={"center"} >
                    <Grid item md={2}>
                        <Button
                            variant={"contained"}
                            onClick={this.removeItemFromCart}
                            className={classes.button}
                        >
                            <Remove className={classes.icons}/>
                        </Button>
                    </Grid>

                    <Grid item md={2}>
                        <Button
                            onClick={this.addItemToCart}
                            variant={"contained"}
                            className={classes.button}
                        >
                            <AddIcon className={classes.icons}/>
                        </Button>
                    </Grid>

                    <Grid item md={2}>
                        <Button
                            onClick={this.removeAllItemFromCart}
                            color={"secondary"}
                            variant={"contained"}
                            className={classes.button}
                        >
                            <DeleteOutlineIcon className={classes.icons} />
                        </Button>
                    </Grid>

                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(CartItem)