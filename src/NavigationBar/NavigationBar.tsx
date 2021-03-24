import {Component} from "react";
import {Grid, withStyles, Button, Tooltip} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from "react-router-dom";
import {withRouter, RouteComponentProps} from "react-router-dom"

interface Props extends RouteComponentProps {
    classes?: any
}

const styles = (theme: any) => ({
    root: {
        height: "6vh",
        backgroundColor: theme.palette.primary.main
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
    }

})

class NavigationBar extends Component<Props> {

    logout = () => {
        localStorage.clear();
    }
    loginAsAdmin = () => {
        this.props.history.push("/LoginAsAdmin")
    }
    loginAsClient = () => {
        this.props.history.push("/LoginAsClient")
    }

    render() {
        const permissions = JSON.parse(localStorage.getItem('permissions') || "{}")
        const {classes} = this.props;
        return (

            <Grid container className={classes.root} justify={"center"} alignItems={"center"}>

                <Grid item container lg={10}>

                    {
                        permissions.client ? <>
                                <Grid item lg={1}>
                                    <Link to={'/'} className={classes.link}>
                                        <Button
                                            className={classes.button}>
                                            {/*<AddIcon/>*/}
                                            اضافة طلب
                                        </Button>
                                    </Link>

                                </Grid>

                                <Grid item lg={1}>
                                    <Link to={'/Order'} className={classes.link}>
                                        <Button
                                            className={classes.button}>
                                            {/*<TocIcon/>*/}
                                            طلباتي
                                        </Button>
                                    </Link>
                                </Grid>
                            </>

                            : ""
                    }

                    {
                        permissions.superAdmin ? <>
                                {/*<Grid item lg={1}>*/}
                                {/*    <Link to={'/AddAdmin'} className={classes.link}>*/}
                                {/*        <Button*/}
                                {/*            className={classes.button}>*/}
                                {/*            /!*<TocIcon/> *!/*/}
                                {/*            اضافة مسؤل*/}
                                {/*        </Button>*/}
                                {/*    </Link>*/}
                                {/*</Grid>*/}
                                <Grid item lg={1}>
                                    <Link to={'/Admin'} className={classes.link}>
                                        <Button
                                            className={classes.button}>
                                            {/*<TocIcon/> */}
                                            كل المسؤلين
                                        </Button>
                                    </Link>
                                </Grid>
                            </>
                            : ""

                    }


                    {
                        permissions.inventory ? <>
                            <Grid item lg={1}>
                                <Link to={'/Room'} className={classes.link}>
                                    <Button
                                        className={classes.button}>
                                        {/*<TocIcon/> */}
                                        الغرف
                                    </Button>
                                </Link>
                            </Grid>

                            <Grid item lg={1}>
                                <Link to={'/Item'} className={classes.link}>
                                    <Button
                                        className={classes.button}>
                                        {/*<TocIcon/>*/}
                                        المواد
                                    </Button>
                                </Link>
                            </Grid>

                            <Grid item lg={1}>
                                <Link to={'/ItemType'} className={classes.link}>
                                    <Button
                                        className={classes.button}>
                                        {/*<TocIcon/> */}
                                        انواع المواد
                                    </Button>
                                </Link>
                            </Grid>

                        </> : ""

                    }
                    {
                        permissions.operations ? <>
                            <Grid item lg={1}>
                                <Link to={'/Order'} className={classes.link}>
                                    <Button
                                        className={classes.button}>
                                        {/*<TocIcon/>*/}
                                        كل الطلبات
                                    </Button>
                                </Link>
                            </Grid>

                        </> : ""

                    }
                </Grid>

                {

                    Object.keys(permissions).length !== 0 ? <Grid item lg={1}>
                        <Tooltip title="تسجيل خروج">

                            <Button
                                className={classes.button}
                                onClick={this.logout}
                                href={'/'}
                            >
                                <ExitToAppIcon/>
                            </Button>
                        </Tooltip>
                    </Grid> : <>

                    </>

                }


            </Grid>

        );
    }

}

export default withStyles(styles)(withRouter(NavigationBar))