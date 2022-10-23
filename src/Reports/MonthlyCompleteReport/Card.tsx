import { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import {Note,Favorite , CalendarTodayOutlined } from '@material-ui/icons';
const styles = (theme: any) => ({
    root: {
        backgroundColor: "#fff",
        margin: "0 10px 3vh 10px",
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
        marginRight: theme.spacing(2)
    },
    text: {
        borderRadius: "5px",
        marginLeft: "10px"
    },
    isGuest: {
        borderTop: '1px ridge #1C6EA4',
        borderColor: theme.palette.primary.light
    },
    cardButton: {
        marginRight: "10px"
    }
});

interface Props {
    order: any
    classes: any
}

class Card extends Component<Props> {

    fromIsotoAst = (date: any) => {
        const localDate = new Date(date).toLocaleString('ar', { hour12: true, timeZone: 'Asia/Baghdad' })
        return localDate;
    }


    render() {
        const { order } = this.props;
        const { classes } = this.props;
        let isGuestStyle = "";
        if (order.isGust) {
            isGuestStyle = classes.isGuest
        }



        return (
            <Grid container item lg={2} md={3} xs={11} sm={5} className={`${isGuestStyle} ${classes.root}`}>

                <Grid item container >
                    {
                        order.items.map((item: any) => {
                            return <Grid item container key={item._id} >
                                <Grid item container justify={"center"} className={classes.itemCount} lg={1} md={1} xs={2}>
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

                {order.date &&
                    <Grid item container alignItems="center">
                        <Grid item><CalendarTodayOutlined fontSize={"default"} color={'primary'} /></Grid>
                        <Grid item md={4} className={classes.text}> {this.fromIsotoAst(String(order.date)) || ""} </Grid>
                    </Grid>
                }
                {order.note &&
                    <Grid item container alignItems="center">
                        <Grid item><Note fontSize={"default"} color={'primary'} /></Grid>
                        <Grid item md={4} className={classes.text}> {order.note}</Grid>
                    </Grid>
                }
                {
                    order.isGust &&
                    <Grid item container alignItems="center">
                        <Grid item><Favorite color={"secondary"} /></Grid>
                        <Grid item className={classes.text}>هنالك زائر</Grid>
                    </Grid>
                }
            </Grid>
        );
    }
}

export default withStyles(styles)(Card)