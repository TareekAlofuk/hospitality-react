import {Component} from "react";
import {Button, Grid, withStyles} from "@material-ui/core";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Link} from "react-router-dom"

interface Props extends RouteComponentProps<any> {
    history: any
    classes?: any
    rooms: any
}


const styles = () => ({

    root:{
        height:"100%"
    }
})


class MainLoginPage extends Component<any, any> {

    render() {
        const {classes} = this.props ;
        return <>
            <Grid container  className={classes.root} justify={"center"} alignItems={"center"} spacing={3}>
                <Grid item >
                    <Link  to={"/LoginAsAdmin"}>

                        <Button
                            variant={"contained"}
                        >
                            لوحة التحكم
                        </Button>
                    </Link>
                </Grid>

                    <Grid item >

                    <Link to={"/LoginAsClient"} >
                    <Button
                        variant={"contained"}
                    >
                        اضافة طلب
                    </Button>
                </Link>


                </Grid>
            </Grid>
        </>;
    }
}

export default withStyles(styles)(withRouter(MainLoginPage))