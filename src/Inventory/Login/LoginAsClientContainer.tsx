import {Component} from "react";
import axios from "axios";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import LoginAsClient from "./LoginAsClient";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import {Alert} from "@material-ui/lab";


interface Props extends RouteComponentProps<any> {
    history:any
}
class LoginAsClientContainer extends Component< Props> {

    state = {
        rooms:[] ,
        loadingRoomStatus:'LOADING'
    }
    getRoom = async () => {
        try {
            const res = await axios.get(Endpoints.room.get)
            const data = res.data.map((room:any)=>{
                return(
                    {
                        text:room.name ,
                        value:room.name
                    }
                )
            })
            this.setState({rooms:data , loadingRoomStatus:"SUCCESS"})
        } catch (e) {
            this.setState({rooms:[] , loadingRoomStatus:"ERROR"})
        }

    }
    componentDidMount() {
        if((localStorage.getItem("clientName")) || (localStorage.getItem("roomName")) || (localStorage.getItem("userId"))) {
            this.props.history.push('/');
            return;
        }
        this.getRoom().then() ;
    }
    render() {
        const {rooms , loadingRoomStatus} = this.state
        if (loadingRoomStatus === "LOADING" ){
            return (
                <CircularProgress />
            );
        }if(loadingRoomStatus === "SUCCESS" ){
            return (
                <LoginAsClient rooms={rooms}/>
            );
        }else {
            return (
                <Alert severity="error">There is an error</Alert>
            );
        }

    }
}
export default withRouter(LoginAsClientContainer)