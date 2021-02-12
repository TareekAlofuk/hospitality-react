import React from "react";
import {Route, Switch} from "react-router-dom";
import ItemTypeContainer from "../ItemType/ShowItemType/ItemTypeContainer";
import EditItemTypeForm from "../ItemType/EditItemType/EditItemTypeForm";
import AddItemTypeForm from "../ItemType/AddItemType/AddItemTypeForm";

class InventoryRoutes extends React.Component {


    render() {
        return (
            <Switch>
                <Route exact path={"/ItemType"} component={ItemTypeContainer}/>
                <Route path={"/EditItemType"} component={EditItemTypeForm}/>
                <Route path={"/AddItemType"} component={AddItemTypeForm}/>
            </Switch>

        );
    }


}

export default InventoryRoutes