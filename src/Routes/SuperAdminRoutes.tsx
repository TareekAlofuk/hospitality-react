import React from "react";
import {Route} from "react-router-dom";

import AddAdminForm from "../SuperAdmin/Admin/AddAdmin/AddAdminForm";
import EditAdminForm from "../SuperAdmin/Admin/EditItem/EditAdminForm";
import ShowAdmins from "../SuperAdmin/Admin/ShowAdmins/ShowAdmins";


class SuperAdminRoutes extends React.Component {


    render() {
        return (
            <>

                {/*ADMIN ROUTES*/}
                <Route exact path={"/Admin"} component={ShowAdmins}/>
                <Route exact path={"/AddAdmin"} component={AddAdminForm}/>
                <Route exact path={"/EditAdmin"} component={EditAdminForm}/>

            </>

        );
    }


}

export default SuperAdminRoutes