import {Component} from "react";
import {Button, Grid, withStyles} from "@material-ui/core";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Link} from "react-router-dom"
import InterfaceImageWithText from "../helperComponents/InterfaceImageWithText";

interface Props extends RouteComponentProps<any> {
    history: any
    classes?: any
    rooms: any
}


const styles = (theme: any) => ({

    root: {
        height: "100%"
    },
    link: {
        textDecoration: "none",
    },
    button: {
        height: theme.spacing(6),
        width: theme.spacing(30)
    },
    imageContainer: {
        height: theme.spacing(60)
    },

})


class MainLoginPage extends Component<Props> {

    render() {
        const imageName = Math.floor((Math.random() * 7) + 1);

        const {classes} = this.props;
        return <>
            <Grid container className={classes.root} justify={"center"} alignItems={"center"}>

                <Grid container className={classes.imageContainer} item lg={12} justify={"center"}
                      alignItems={"center"}>
                    <InterfaceImageWithText imageSrc={`img/${imageName}.svg`}  imageAlt={"login"}/>

                </Grid>

                <Grid container item lg={12} justify={"center"} alignItems={"center"} spacing={3}>
                    <Grid item>
                        <Link className={classes.link} to={"/LoginAsAdmin"}>
                            <Button
                                className={classes.button}
                                variant={"contained"}
                            >
                                لوحة التحكم
                            </Button>
                        </Link>
                    </Grid>

                    <Grid item>
                        <Link className={classes.link} to={"/LoginAsClient"}>
                            <Button
                                className={classes.button}
                                variant={"contained"}
                                color={"primary"}
                            >
                                اضافة طلب
                            </Button>
                        </Link>


                    </Grid>
                </Grid>

            </Grid>
        </>;
    }
}

export default withStyles(styles)(withRouter(MainLoginPage))