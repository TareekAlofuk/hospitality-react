import RoutesContainer from "./Routes/RoutesContainer";
import {Component } from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Button, Grid} from "@material-ui/core";
import NavigationBar from "./NavigationBar/NavigationBar";


interface Props extends RouteComponentProps<any> {
    history:any
}

class  App extends Component<Props> {

    isClient = () => {
        if(!(localStorage.getItem("clientName")) || !(localStorage.getItem("roomName")) || !(localStorage.getItem("userId")) ) {
            this.props.history.push('/LoginAsClient')
        }
    }


componentDidMount() {
    this.isClient()
}

    render() {
        console.log(localStorage)
        return (
            <Grid container className="App"  style={{ direction:"rtl" , height:"100vh" }}>
                <Grid item md={11}><RoutesContainer/></Grid>
                <Grid item md={1}><NavigationBar/></Grid>


                {/*<Button variant={"contained"}*/}
                {/*     onClick={()=>{*/}
                {/*    localStorage.removeItem('clientName')*/}
                {/*    localStorage.removeItem('roomName')*/}
                {/*         this.isClient()*/}

                {/*     }}>sign out </Button>*/}
            </Grid>
        );
    }



}

export default withRouter(App);
