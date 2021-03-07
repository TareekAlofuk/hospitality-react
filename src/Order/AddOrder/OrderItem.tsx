import {Component} from "react";
import {Box, Button, CardMedia, Grid, Typography} from "@material-ui/core";
import Popover from '@material-ui/core/Popover';
import {withStyles} from "@material-ui/core/styles";

interface Props {
    item: {
        name: any,
        type: any,
        image: any,
        count?: any
    },
    addItemToCart: any,
    count: any,
    removeItemFromCart: any,
    removeAllItemFromCart: any,
    classes: any
}

const styles = () => ({
    root: {},
    popOver: {
        padding: "5px"
    }
});

class OrderItem extends Component<Props> {
    state = {anchorEl: null, buttonPressTimer: undefined}
    handleMouseDown = (event: any) => {
        const currentTarget = event.currentTarget;
        if (this.state.buttonPressTimer) clearTimeout(this.state.buttonPressTimer)
        this.setState({
            buttonPressTimer: setTimeout(() => {
                this.handleOpenPopover(currentTarget)
            }, 500)
        })
    }
    handleMouseUp = () => {
        clearTimeout(this.state.buttonPressTimer)
    }
    handleOpenPopover = (currentTarget: any) => {
        this.setState({anchorEl: currentTarget});
    };

    handleClosePopover = () => {
        this.setState({anchorEl: null});
    };
    addItemToCart = () => {
        this.props.addItemToCart(this.props.item)
    }

    removeItemFromCart = () => {
        const item = this.props.item;
        item.count = this.props.count
        this.props.removeItemFromCart(item)
    }

    removeAllItemFromCart = () => {
        const item = this.props.item;
        this.props.removeAllItemFromCart(item)
    }


    render() {
        const {item} = this.props
        const {classes} = this.props
        const open = Boolean(this.state.anchorEl);
        const id = open ? 'simple-popover' : undefined;
        return (
            <Grid item md={3} className={classes.root}>

                <Button
                    variant="contained"
                    onClick={this.addItemToCart}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    startIcon={<CardMedia component="img"
                                          image={item.image}
                                          title={item.name}
                                          height="180"
                    />
                    }
                >

                </Button>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClosePopover}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box className={classes.popOver}>
                        <Typography>name:{this.props.item.name}</Typography>
                        <Typography>count:{this.props.count}</Typography>

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
                    </Box>
                </Popover>
            </Grid>
        );
    }
}

export default withStyles(styles)(OrderItem)