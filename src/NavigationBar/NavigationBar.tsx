import {Component} from "react";
import {AppBar, Box, Button, Fade, Grid, IconButton, Tooltip, withStyles, withWidth} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import {Close} from "@material-ui/icons";

interface Props extends RouteComponentProps {
    classes: any,
    width?: any
}

const styles = (theme: any) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
    },
    button: {
        borderRadius: "0",
        width: '100%',
        color: theme.palette.common.white,
        "&:hover": {
            backgroundColor: "transparent",
        }
    },
    link: {
        textDecoration: "none",
    },

    open: {},
    close: {},
    navigationButtonContainer: {
        top: '0',
        width: "100vw",
    }

})

class NavigationBar extends Component<Props> {

    state = {
        open: false
    }
    logout = () => {
        localStorage.clear();
    }
    loginAsAdmin = () => {
        this.props.history.push("/LoginAsAdmin")
    }
    loginAsClient = () => {
        this.props.history.push("/LoginAsClient")
    }
    closeNavbar = () => {
        this.setState({open: false})
    }

    render() {
        const permissions = JSON.parse(localStorage.getItem('permissions') || "{}")
        const {classes, width} = this.props;
        const direction = width === "xs" || width === "sm" ? "column" : "row"
        const isMobile = (width === "xs" || width === "sm")
        if (isMobile && !(this.state.open)) {
            return <div className={classes.navigationButtonContainer} style={{position:"sticky"}}  >
                <IconButton color={"primary"}
                            onClick={() => {
                                this.setState({open: true})
                            }}><ViewHeadlineIcon/></IconButton>
            </div>
        } else {
            return (
                <Fade in={this.state.open || !(isMobile)} timeout={{enter: 800, exit: 800}}>

                    <AppBar position="sticky">

                        <Grid container className={classes.root} justify={"center"} alignItems={"center"}
                              direction={direction}>

                            <Grid item container lg={10} md={11} sm={8} xs={12} spacing={1} alignItems={"center"}
                                  direction={direction}>

                                {
                                    permissions.client ? <>
                                        <Grid item>
                                            <Link to={'/'} className={classes.link}>
                                                <Button
                                                    onClick={this.closeNavbar}
                                                    className={classes.button}>
                                                    اضافة طلب
                                                </Button>
                                            </Link>

                                        </Grid>

                                        <Grid item>
                                            <Link to={'/Order'} className={classes.link}>
                                                <Button
                                                    onClick={this.closeNavbar}
                                                    className={classes.button}>
                                                    طلباتي
                                                </Button>
                                            </Link>
                                        </Grid>
                                    </> : ""
                                }

                                {
                                    permissions.superAdmin ? <>

                                        <Grid item>
                                            <Link to={'/Admin'} className={classes.link}>
                                                <Button
                                                    onClick={this.closeNavbar}
                                                    className={classes.button}>
                                                    كل المسؤولين
                                                </Button>
                                            </Link>
                                        </Grid>
                                    </> : ""
                                }

                                {
                                    permissions.inventory ? <>
                                        <Grid item>
                                            <Link to={'/Room'} className={classes.link}>
                                                <Button
                                                    onClick={this.closeNavbar}
                                                    className={classes.button}>
                                                    الغرف
                                                </Button>
                                            </Link>
                                        </Grid>

                                        <Grid item>
                                            <Link to={'/Item'} className={classes.link}>
                                                <Button
                                                    onClick={this.closeNavbar}
                                                    className={classes.button}>
                                                    المواد
                                                </Button>
                                            </Link>
                                        </Grid>

                                        <Grid item>
                                            <Link to={'/ItemType'} className={classes.link}>
                                                <Button
                                                    onClick={this.closeNavbar}
                                                    className={classes.button}>
                                                    انواع المواد
                                                </Button>
                                            </Link>
                                        </Grid>

                                    </> : ""
                                }
                                {
                                    permissions.operations ? <>
                                        <Grid item>
                                            <Link to={'/Order'} className={classes.link}>
                                                <Button
                                                    onClick={this.closeNavbar}
                                                    className={classes.button}>
                                                    كل الطلبات
                                                </Button>
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to={'/Waiting'} className={classes.link}>
                                                <Button
                                                    onClick={this.closeNavbar}
                                                    className={classes.button}>
                                                    قيد الانتظار
                                                </Button>
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to={'/UnderwayOrder'} className={classes.link}>
                                                <Button
                                                    onClick={this.closeNavbar}
                                                    className={classes.button}>
                                                    جار العمل
                                                </Button>
                                            </Link>
                                        </Grid>


                                    </> : ""
                                }

                                {isMobile ?
                                    <Grid item>
                                        <IconButton
                                            className={classes.button}
                                            onClick={this.closeNavbar}
                                        >
                                            <Close/>
                                        </IconButton>
                                    </Grid> : ""
                                }
                            </Grid>

                            {
                                Object.keys(permissions).length !== 0 ? <Grid item sm={1} xs={12}>
                                    <Tooltip title="تسجيل خروج">

                                        <Button
                                            className={classes.button}
                                            onClick={this.logout}
                                            href={'/'}
                                        >
                                            <ExitToAppIcon/>
                                        </Button>
                                    </Tooltip>
                                </Grid> : ""
                            }

                        </Grid>
                    </AppBar>
                </Fade>

            );
        }

    }

}

export default withStyles(styles)(withWidth()(withRouter(NavigationBar)))