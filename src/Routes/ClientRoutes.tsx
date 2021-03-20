import React from "react";
import {Route} from "react-router-dom";
import AddOrderContainer from "../Order/AddOrder/AddOrderContainer";
import { Switch} from "react-router-dom";
import ShowOrders from "../Order/ShowOrders/ShowOrders";
import {Endpoints} from "../Shared/Endpoints/Endpoints";


class ClientRoutes extends React.Component {


    render() {
        return (
            <Switch>

                {/*ORDER ROUTES*/}
                {/*<Route exact path={"/Admin"} component={ShowAdmins}/>*/}
                <Route exact path={"/"} component={AddOrderContainer}/>
                <Route exact path={"/Order"} ><ShowOrders auth={"client"} getUrl={Endpoints.Order.getClientOrder(localStorage.getItem("userId"))} deleteUrl={Endpoints.Order.delete} updateUrl={Endpoints.Order.UpdateStatus} /></Route>
                {/*<Route exact path={"/EditAdmin"} component={EditAdminForm}/>*/}

            </Switch>

        );
    }


}

export default ClientRoutes