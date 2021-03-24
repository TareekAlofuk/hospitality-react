import {Component} from "react";
import {Box, Button, CardMedia, Grid, IconButton, Typography} from "@material-ui/core";
import Popover from '@material-ui/core/Popover';
import {withStyles} from "@material-ui/core/styles";
import MinimizeIcon from "@material-ui/icons/Minimize";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

interface Props {
    item: {
        itemName: any,
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

const styles = (theme: any) => ({
    root: {
        overflow: 'hidden',
    },
    item: {
        backgroundColor: "#fff",
        height: '20vh',
        width: "100%",
        padding: "0px !important",
        overflow: 'hidden',

    },
    itemName: {
        fontSize: "18px !important",
    },
    itemNameInPop: {
        fontSize: "24px !important",
    },
    image: {
        height: "12vh",
    },
    imageContainer: {
        height: "15vh",
        overflow: "hidden"
    },
    itemNameContainer: {
        height: "5vh",
        width: "100%",
        backgroundColor: theme.palette.grey[100] ,
        paddingTop:"10px"
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
                    className={classes.item}
                    variant="text"
                    onClick={this.addItemToCart}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                >
                    <Grid container>
                        <Grid item container md={12} className={classes.imageContainer} justify={"center"}
                              alignItems={'center'}>
                            <Grid item>
                                <img
                                    src={item.image}
                                    alt={"item"}
                                    className={classes.image}
                                />
                            </Grid>
                        </Grid>

                            <Grid item md={12} className={classes.itemNameContainer}>
                                <Typography className={classes.itemName} component={"h6"}
                                            variant={"h6"}>{item.itemName}</Typography>
                            </Grid>
                    </Grid>

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
                    <Grid item container justify={"center"} alignItems={"center"}>
                        <Grid item md={12}>
                            <Typography className={classes.itemNameInPop} variant={"h5"} align={"center"}>
                                {this.props.item.itemName}
                            </Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Box>
                                <Typography className={classes.count} variant={"h5"} align={"center"}>
                                    {this.props.count}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item container justify={"center"}>
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
                </Popover>
            </Grid>
        );
    }
}

export default withStyles(styles)(OrderItem)