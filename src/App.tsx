import RoutesContainer from "./Routes/RoutesContainer";
import {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Grid} from "@material-ui/core";
import NavigationBar from "./NavigationBar/NavigationBar";
import axios from "axios";
import {connect} from "react-redux";

interface Props extends RouteComponentProps<any> {
    history: any,
    dispatch: any
}


axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null
    config.headers.authorization = token;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

class App extends Component<Props> {

    LoginStatus = () => {
        if (!(localStorage.getItem("clientName")) || !(localStorage.getItem("roomName")) || !(localStorage.getItem("userId"))) {
            // this.props.history.push('/LoginAsClient')
        } else {

        }
    }


    isAdmin = () => {
        if (1 !== 1) {
            // this.props.history.push('/LoginAsClient')
        } else {

        }
    }


    componentDidMount() {
        this.LoginStatus()
    }

    render() {
        return (
            <Grid container className="App" style={{direction: "rtl", height: "100vh"}}>
                {localStorage.getItem("permissions") === null ? " " : <NavigationBar/>}
                <RoutesContainer/>
            </Grid>
        );
    }


}

export default connect()(withRouter(App));
