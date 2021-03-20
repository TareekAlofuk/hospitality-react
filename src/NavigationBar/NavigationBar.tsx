import {Component} from "react";
import {Grid, withStyles, Button} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TocIcon from '@material-ui/icons/Toc';
import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom";

interface Props {
    classes?:any
}
const styles = (theme:any)=>( {
    root:{
        height:"30%" ,
        backgroundColor:"#fff"
    },
    button:{
        borderRadius:"0",
        width:'100%'
    },

})

class NavigationBar extends Component<Props>{

    logout = () => {
        localStorage.clear();
    }
    render() {
        console.log(localStorage.getItem("permissions"))

        const {classes} = this.props ;
        return (


            <Grid container className={classes.root}  justify={"center"} alignItems={"center"}>

                <Grid item  md={12}>

                    <Link to={'/'}>
                        <Button
                            color="primary"
                            className={classes.button}>
                            <AddIcon/>  اضافة طلب
                        </Button>
                    </Link>
                </Grid>

                <Grid item md={12} >
                    <Link to={'/Order'}>
                        <Button
                            color="primary"
                            className={classes.button}>
                            <TocIcon  />  كل الطلبات
                        </Button>
                    </Link>
                </Grid>


                <Grid item md={12} >
                    <Button
                        color="primary"
                        className={classes.button}
                    >
                        <TocIcon  /> كل الطلبات
                    </Button>
                </Grid>


                        <Grid item md={12}>
                            <Button
                                color="secondary"
                                className={classes.button}
                                onClick={this.logout}
                                href={'/'}
                            >
                                <ExitToAppIcon  /> تسجيل خروج
                            </Button>
                        </Grid>



            </Grid>

        );
    }
}
export default withStyles(styles)(NavigationBar)