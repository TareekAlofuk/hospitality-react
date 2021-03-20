import React from "react";
import {Route} from "react-router-dom";
import AddAdminForm from "../Admin/AddAdmin/AddAdminForm";
import EditAdminForm from "../Admin/EditItem/EditAdminForm";
import ShowAdmins from "../Admin/ShowAdmins/ShowAdmins";
import {Switch} from "react-router-dom";


class SuperAdminRoutes extends React.Component {


    render() {
        return (
            <Switch>

                {/*ADMIN ROUTES*/}
                <Route exact path={"/Admin"} component={ShowAdmins}/>
                <Route exact path={"/AddAdmin"} component={AddAdminForm}/>
                <Route exact path={"/EditAdmin"} component={EditAdminForm}/>

            </Switch>

        );
    }


}

export default SuperAdminRoutes