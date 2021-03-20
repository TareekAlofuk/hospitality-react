import {Component} from "react";
import {Grid, withStyles, Button} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TocIcon from '@material-ui/icons/Toc';
import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom";
import {withRouter , RouteComponentProps} from "react-router-dom"

interface Props extends RouteComponentProps{
    classes?: any
}

const styles = (theme: any) => ({
    root: {
        height: "10%",
        backgroundColor: "#fff"
    },
    button: {
        borderRadius: "0",
        width: '100%'
    },

})

class NavigationBar extends Component<Props>{

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
                {
                    permissions.client ? <>
                            <Grid item md={1}>
                                <Link to={'/'}>
                                    <Button
                                        color="primary"
                                        className={classes.button}>
                                        <AddIcon/> اضافة طلب
                                    </Button>
                                </Link>

                            </Grid>

                            <Grid item md={1}>
                                <Link to={'/Order'}>
                                    <Button
                                        color="primary"
                                        className={classes.button}>
                                        <TocIcon/> طلباتي
                                    </Button>
                                </Link>
                            </Grid>
                        </>

                        : ""
                }

                {
                    permissions.superAdmin?<>
                        <Grid item md={1}>
                            <Link to={'/AddAdmin'}>
                                <Button
                                    color="primary"
                                    className={classes.button}>
                                    <TocIcon/> اضافة مسؤل
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item md={1}>
                            <Link to={'/Admin'}>
                                <Button
                                    color="primary"
                                    className={classes.button}>
                                    <TocIcon/> كل المسؤلين
                                </Button>
                            </Link>
                        </Grid>
                        </>
                        :""

                }

                {
                    permissions.operations?<>
                        <Grid item md={1}>
                            <Link to={'/Order'}>
                                <Button
                                    color="primary"
                                    className={classes.button}>
                                    <TocIcon/> كل الطلبات
                                </Button>
                            </Link>
                        </Grid>

                    </>:""

                }

                {
                    permissions.inventory?<>
                        <Grid item md={1}>
                            <Link to={'/Room'}>
                                <Button
                                    color="primary"
                                    className={classes.button}>
                                    <TocIcon/> الغرف
                                </Button>
                            </Link>
                        </Grid>

                        <Grid item md={1}>
                            <Link to={'/Item'}>
                                <Button
                                    color="primary"
                                    className={classes.button}>
                                    <TocIcon/> المواد
                                </Button>
                            </Link>
                        </Grid>

                        <Grid item md={1}>
                            <Link to={'/ItemType'}>
                                <Button
                                    color="primary"
                                    className={classes.button}>
                                    <TocIcon/> انواع المواد
                                </Button>
                            </Link>
                        </Grid>

                    </>:""

                }
                {

                    Object.keys(permissions).length !== 0?  <Grid item md={1}>
                        <Button
                            color="secondary"
                            className={classes.button}
                            onClick={this.logout}
                            href={'/'}
                        >
                            <ExitToAppIcon/> تسجيل خروج
                        </Button>
                    </Grid>:<>
                        {/*<Grid item md={1}>*/}
                        {/*    <Button*/}
                        {/*        color="secondary"*/}
                        {/*        className={classes.button}*/}
                        {/*        onClick={this.loginAsAdmin}*/}
                        {/*    >*/}
                        {/*        <ExitToAppIcon/> لوحة التحكم*/}
                        {/*    </Button>*/}
                        {/*</Grid>*/}
                        {/*<Grid item md={1}>*/}
                        {/*    <Button*/}
                        {/*        color="secondary"*/}
                        {/*        className={classes.button}*/}
                        {/*        onClick={this.loginAsClient}*/}
                        {/*    >*/}
                        {/*        <ExitToAppIcon/> ارسال طلب*/}
                        {/*    </Button>*/}
                        {/*</Grid>*/}
                    </>

                }






            </Grid>

        );
    }

}
export default  withStyles(styles)(withRouter(NavigationBar))