import React from "react";
import {Route} from "react-router-dom";
import { Switch} from "react-router-dom";
import LoginAsClientContainer from "../Inventory/Login/LoginAsClientContainer";


class LoginRoutes extends React.Component {


    render() {
        return (
            <Switch >
                <Route exact path={"/LoginAsClient"} component={LoginAsClientContainer}/>
            </Switch>

        );
    }


}

export default LoginRoutes