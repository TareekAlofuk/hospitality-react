import React from "react";
import {Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import ShowOrders from "../Order/ShowOrders/ShowOrders";
import {Endpoints} from "../Shared/Endpoints/Endpoints";


class OperationsRoutes extends React.Component {


    render() {
        return (
            <Switch>

                <Route exact path={"/Order"}><ShowOrders auth={"operations"}
                                                         getUrl={Endpoints.Order.get}
                                                         deleteUrl={Endpoints.Order.delete}
                                                         updateUrl={Endpoints.Order.UpdateStatus}/></Route>
            </Switch>

        );
    }


}

export default OperationsRoutes