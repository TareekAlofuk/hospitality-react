import {Component} from "react";
import {Button, Grid, withStyles, withWidth} from "@material-ui/core";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Link} from "react-router-dom"
import InterfaceImageWithText from "../helperComponents/InterfaceImageWithText";
interface Props extends RouteComponentProps<any> {
    history: any
    classes?: any
    rooms: any
    width:any
}


const styles = (theme: any) => ({


    link: {
        textDecoration: "none",
    },
    button: {
        height: theme.spacing(6),
        width: theme.spacing(30),
    },


})


class MainLoginPage extends Component<Props> {
    render() {
        const imageName = Math.floor((Math.random() * 7) + 1);

        const {classes , width} = this.props;
        const imageContainerHeight = width ==='sm' || width==='xs' ? '65vh':'90vh';

        return <>
            <Grid container justify={"center"} alignItems={"center"}>

                <Grid container  item lg={12} justify={"center"}
                      alignItems={"center"}
                      style={{height:imageContainerHeight}}>
                    <InterfaceImageWithText imageSrc={`/img/${imageName}.svg`}  imageAlt={"login"} locationInMobileScreen={'top'}/>

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

export default withStyles(styles)(withWidth()(withRouter(MainLoginPage)))