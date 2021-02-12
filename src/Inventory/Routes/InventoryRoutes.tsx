import React from "react";
import {Route, Switch} from "react-router-dom";
import ItemTypeContainer from "../ItemType/ShowItemType/ItemTypeContainer";
import EditItemTypeForm from "../ItemType/EditItemType/EditItemTypeForm";
import AddItemTypeForm from "../ItemType/AddItemType/AddItemTypeForm";
import AddRoomForm from "../Room/AddRoom/AddRoomForm";
import RoomContainer from "../Room/ShowRoom/RoomContainer"
import EditRoomForm from "../Room/EditRoom/EditRoomForm"

class InventoryRoutes extends React.Component {


    render() {
        return (
            <Switch>
                {/*ITEM TYPE ROUTES*/}
                <Route exact path={"/ItemType"} component={ItemTypeContainer}/>
                <Route path={"/EditItemType"} component={EditItemTypeForm}/>
                <Route path={"/AddItemType"} component={AddItemTypeForm}/>
                {/*ROOM ROUTES*/}
                <Route exact path={"/Room"} component={RoomContainer}/>
                <Route path={"/EditRoom"} component={EditRoomForm}/>
                <Route path={"/AddRoom"} component={AddRoomForm}/>
            </Switch>

        );
    }


}

export default InventoryRoutes