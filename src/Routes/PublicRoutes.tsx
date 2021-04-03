import React from "react";
import {Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import LoginAsClientContainer from "../Login/ClientLogin/LoginAsClientContainer";
import LoginAsAdmin from "../Login/AdminLogin/LoginAsAdmin";
import MainLoginPage from "../Login/MainLoginPage";
import Reports from "../Reports/Reports";


class PublicRoutes extends React.Component {


    render() {
        return (
            <Switch>
                <Route exact path={"/loginChooses"} component={MainLoginPage}/>
                <Route exact path={"/LoginAsClient"} component={LoginAsClientContainer}/>
                <Route exact path={"/LoginAsAdmin"} component={LoginAsAdmin}/>
            </Switch>

        );
    }


}

export default PublicRoutes