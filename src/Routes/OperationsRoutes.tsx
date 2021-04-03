import React from "react";
import {Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import ShowOrders from "../Order/ShowOrders/ShowOrders";
import {Endpoints} from "../Shared/Endpoints/Endpoints";
import Reports from "../Reports/Reports";


class OperationsRoutes extends React.Component {


    render() {
        return (
            <Switch>

                <Route  path={"/Order"}><ShowOrders auth={"operations"}
                                                         getUrl={Endpoints.Order.get}
                                                         deleteUrl={Endpoints.Order.delete}
                                                         updateUrl={Endpoints.Order.UpdateStatus}/></Route>
                <Route exact path={"/UnderwayOrder"} key={"showUnderwayOrder"}><ShowOrders auth={"operations"}
                                                         getUrl={Endpoints.Order.showUnderwayOrder}
                                                         deleteUrl={Endpoints.Order.delete}
                                                         updateUrl={Endpoints.Order.UpdateStatus}/></Route>
                <Route exact path={"/Waiting"} key={"showWaitingOrder"}><ShowOrders auth={"operations"}
                                                         getUrl={Endpoints.Order.showWaitingOrder}
                                                         deleteUrl={Endpoints.Order.delete}
                                                         updateUrl={Endpoints.Order.UpdateStatus}/></Route>

            </Switch>

        );
    }


}

export default OperationsRoutes