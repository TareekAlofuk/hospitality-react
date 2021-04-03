import {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {Button, Grid} from "@material-ui/core";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import NoteIcon from '@material-ui/icons/Note';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Close} from "@material-ui/icons";

const styles = (theme: any) => ({
    root: {
        backgroundColor: "#fff",
        marginBottom: "3vh",
        padding: "2vh 0vh 2vh 2vh",
        borderRadius: "10px",
        boxShadow: "0px 6px 13px -1px rgba(0,0,0,0.05);",
        "& > *": {
            marginBottom: "1vh"
        }

    },
    itemCount: {
        backgroundColor: "#f9f9f9",
        alignItems: "center",
        borderRadius: "100px",
        justifyContent: "center",
        marginBottom: "1vh",
        marginRight:theme.spacing(2)
    },
    roomName: {
        marginBottom: "2vh"
    },
    text: {
        borderRadius: "5px",
        marginLeft: "10px"
    },
    isGuest: {
        borderTop: '1px ridge #1C6EA4',
        borderColor: theme.palette.primary.light
    },
    cardButton:{
        marginRight:"10px"
    }
});

interface Props {
    order: any
    classes: any
    deleteOrder: any
    auth: any
    UpdateStatus: any

}

class OrderCard extends Component<Props> {

    render() {
        const {order, deleteOrder, auth, UpdateStatus} = this.props;
        const {classes} = this.props;
        let isGuestStyle = "";
        if (order.isGust) {
            isGuestStyle = classes.isGuest
        }


        return (
            <Grid container item lg={7} md={8} xs={11} sm={9} className={`${isGuestStyle} ${classes.root}`}>
                <Grid item container alignItems="center">
                    <Grid item><PersonOutlineOutlinedIcon fontSize={"large"} color={'primary'}/></Grid>
                    <Grid item className={classes.text}>{order.client.clientName}</Grid>
                </Grid>

                <Grid item container className={classes.roomName} alignItems="center">
                    <Grid item><RoomOutlinedIcon fontSize={"default"} color={'primary'}/></Grid>
                    <Grid item className={classes.text}>{order.client.roomName}</Grid>
                </Grid>

                <Grid item container >
                    {
                        order.items.map((item: any) => {
                            return <Grid item container key={item._id} >
                                <Grid item container justify={"center"} className={classes.itemCount}  lg={1} md={1} xs={2}>
                                    <Grid >
                                        {item.count}
                                    </Grid>
                                </Grid>

                                <Grid item xs={7}>
                                    {item.itemName}
                                </Grid>
                            </Grid>

                        })
                    }
                </Grid>

                {order.note &&
                <Grid item container alignItems="center">
                    <Grid item><NoteIcon fontSize={"default"} color={'primary'}/></Grid>
                    <Grid item md={4} className={classes.text}> {order.note}</Grid>
                </Grid>
                }

                {
                    order.status === 0 &&
                    <Grid item container alignItems="center">
                        <Grid item><DoneIcon color={"disabled"}/></Grid>
                        <Grid item className={classes.text}>قيد الانتظار </Grid>
                    </Grid>
                }
                {
                    order.status === 1 &&
                    <Grid item container alignItems="center">
                        <Grid item><DoneAllIcon color={"disabled"}/></Grid>
                        <Grid item className={classes.text}> قيد العمل</Grid>
                    </Grid>
                }
                {
                    order.status === 2 &&
                    <Grid item container alignItems="center">
                        <Grid item><DoneAllIcon color={"primary"}/></Grid>
                        <Grid item className={classes.text}>مكتمل</Grid>
                    </Grid>
                }
                {
                    order.status === 3 &&
                    <Grid item container alignItems="center">
                        <Grid item><Close color={"secondary"}/></Grid>
                        <Grid item className={classes.text}>غير متوفر</Grid>
                    </Grid>
                }
                {
                    order.isGust &&
                    <Grid item container alignItems="center">
                        <Grid item><FavoriteIcon color={"secondary"}/></Grid>
                        <Grid item className={classes.text}>هنالك زائر</Grid>
                    </Grid>
                }
                {
                    order.status === 0 && auth === 'client' &&
                    <Grid item md={12}  >
                        <Button
                            color="primary"
                            variant={"contained"}
                            onClick={() => {
                                deleteOrder(order._id)
                            }}
                        >
                            الغاء الطلب
                        </Button>
                    </Grid>
                }

                {
                    auth === 'operations' &&
                    <Grid item md={12} >

                        {
                            order.status === 0 &&
                            <Button
                                color="primary"
                                className={classes.cardButton}
                                variant={"contained"}
                                onClick={() => {
                                    UpdateStatus(order._id, 1)
                                }}
                            >
                                بدأ العمل
                            </Button>

                        }
                        {
                            order.status === 0 &&
                            <Button
                                color="secondary"
                                variant={"contained"}
                                onClick={() => {
                                    UpdateStatus(order._id, 3)
                                }}
                            >
                                رفض
                            </Button>

                        }
                        {
                            order.status === 1 &&
                            <Button
                                color="primary"
                                variant={"contained"}
                                onClick={() => {
                                    UpdateStatus(order._id, 2)
                                }}
                            >
                                تم
                            </Button>
                        }

                    </Grid>
                }


            </Grid>
        );
    }
}

export default withStyles(styles)(OrderCard)