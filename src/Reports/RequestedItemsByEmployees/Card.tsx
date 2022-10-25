import { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
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
    isGuest: {
        borderTop: '1px ridge #1C6EA4',
        borderColor: theme.palette.primary.light
    },
});

interface Props {
    item: any
    classes: any
}

class Card extends Component<Props> {

    fromIsotoAst = (date: any) => {
        const localDate = new Date(date).toLocaleString('ar', { hour12: true, timeZone: 'Asia/Baghdad' })
        return localDate;
    }


    render() {
        const { item } = this.props;
        const { classes } = this.props;
        let isGuestStyle = "";



        return (
            <Grid container item lg={2} md={3} xs={11} sm={5} className={`${isGuestStyle} ${classes.root}`}>

                <Grid item container >
                    {
                        <Grid item container key={item._id} >
                            <Grid item container justify={"center"} className={classes.itemCount} lg={1} md={1} xs={2}>
                                <Grid >
                                    {item.count}
                                </Grid>
                            </Grid>

                            <Grid item xs={7}>
                                {item.itemName}
                            </Grid>
                        </Grid>

                    }
                </Grid>

            </Grid>
        );
    }
}

export default withStyles(styles)(Card)