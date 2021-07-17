import React from "react";
import {Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import Reports from "../Reports/ReportByEmployeesName/Reports";
import ReportContainer from "../Reports/ReportContainer";


class ReportsRoutes extends React.Component {


    render() {
        return (
            <Switch>
                <Route exact path={"/Report"} component={ReportContainer}/>
            </Switch>

        );
    }


}

export default ReportsRoutes