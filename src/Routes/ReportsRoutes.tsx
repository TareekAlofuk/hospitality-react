import React from "react";
import {Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import Reports from "../Reports/Reports";


class ReportsRoutes extends React.Component {


    render() {
        return (
            <Switch>
                <Route exact path={"/ClientsReport"} component={Reports}/>
            </Switch>

        );
    }


}

export default ReportsRoutes