import {Component} from "react";
import {Grid, withStyles, Button, Link} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TocIcon from '@material-ui/icons/Toc';
import AddIcon from '@material-ui/icons/Add';
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


    render() {
        const {classes} = this.props ;
        return (
            <Grid container className={classes.root}  justify={"center"} alignItems={"center"}>

                <Grid item  md={12}>

                    <Button
                        color="primary"
                        className={classes.button}
                        href="/Order/Add"
                    >
                        <AddIcon/>  اضافة طلب
                    </Button>
                </Grid>

                <Grid item md={12} >
                <Button
                    color="primary"
                    className={classes.button}
                    href="/Order">
                    <TocIcon  />  كل الطلبات
                </Button>
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
                        onClick={()=>{
                            localStorage.removeItem('clientName')
                            localStorage.removeItem('userId')
                            localStorage.removeItem('roomName')
                        }}
                    >
                        <ExitToAppIcon  /> تسجيل خروج
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(styles)(NavigationBar)