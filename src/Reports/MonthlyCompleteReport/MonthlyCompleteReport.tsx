import {  CircularProgress, Grid } from '@material-ui/core';
import  { Component } from 'react';
import Card from "./Card";
import { withStyles } from "@material-ui/core/styles";
import { RoomOutlined } from '@material-ui/icons';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { LoadingStatus } from '../ReportContainer';
import InterfaceImageWithText from '../../helperComponents/InterfaceImageWithText';


const styles = (theme: any) => ({
    root: {
        backgroundColor: "#fff",
    },
    itemCount: {
        backgroundColor: "#f9f9f9",
        alignItems: "center",
        borderRadius: "100px",
        justifyContent: "center",
        padding:"5px",
        marginRight: theme.spacing(2)
    },
    marginBottom: {
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
    cardButton: {
        marginRight: "10px"
    },
    clientInfoCard: {
        backgroundColor: "#e2e2e2",
        margin: "3vh 0 5vh 0",
        padding: "2vh 0vh 2vh 2vh",
        borderRadius: "10px",
        boxShadow: "0px 6px 13px -1px rgba(0,0,0,0.05);",
        "& > *": {
            marginBottom: "1vh"
        },
    }
});


interface Props {
    clients: any,
    classes: any,
    status:LoadingStatus
}
class MonthlyCompleteReport extends Component<Props> {

    render(): any {
        const { classes, clients , status } = this.props;
        if (status === 0) return <CircularProgress />
        if (status === 2) return <InterfaceImageWithText imageSrc={"img/warning.svg"} textUnderImage={" نأسف... يبدو ان هنالك خطأ"} imageAlt={"خطر"} />
        return clients.map((client: any, index: number) => {
            const orders = client.orders
            return <Grid item container justify='center' key={index} alignContent='center' className={classes.root}>
                <Grid item container lg={11} md={10} xs={11} sm={9} className={classes.clientInfoCard}  >
                    <Grid item container className={classes.marginBottom} alignItems="center">
                        <Grid item><PersonOutlineOutlinedIcon fontSize={"default"} color={'primary'} /></Grid>
                        <Grid item className={classes.text}>{client._id.clientName}</Grid>
                    </Grid>
                    <Grid item container className={classes.marginBottom} alignItems="center">
                        <Grid item><RoomOutlined fontSize={"default"} color={'primary'} /></Grid>
                        <Grid item className={classes.text}>{client._id.marginBottom}</Grid>
                    </Grid>

                    <Grid item container className={classes.marginBottom} alignItems="center">
                        <Grid item className={classes.itemCount}>{client.ordersCount}</Grid>
                        <Grid item>مجموع  الطلبات  </Grid>
                    </Grid>

                    <Grid item container className={classes.marginBottom} alignItems="center">
                        <Grid item className={classes.itemCount}>{client.totalItems}</Grid>
                        <Grid item>مجموع العناصر في الطلبات  </Grid>
                    </Grid>
                </Grid>


                {
                    orders.map((order: any, index: any) => {
                        return <Card order={order} key={index} />
                    })

                }

            </Grid>


        })


    }
}

export default withStyles(styles)(MonthlyCompleteReport)