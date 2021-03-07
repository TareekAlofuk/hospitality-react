import React from "react";
import {Route} from "react-router-dom";
import ItemTypeContainer from "../Inventory/ItemType/ShowItemType/ItemTypeContainer";
import EditItemTypeForm from "../Inventory/ItemType/EditItemType/EditItemTypeForm";
import AddItemTypeForm from "../Inventory/ItemType/AddItemType/AddItemTypeForm";
import AddRoomForm from "../Inventory/Room/AddRoom/AddRoomForm";
import RoomContainer from "../Inventory/Room/ShowRoom/RoomContainer";
import EditRoomForm from "../Inventory/Room/EditRoom/EditRoomForm";
import ShowItem from "../Inventory/Item/ShowItem/ShowItem";
import AddItemContainer from "../Inventory/Item/AddItem/AddItemContainer";
import EditItemContainer from "../Inventory/Item/EditItem/EditItemContainer";
import { Switch} from "react-router-dom";




class InventoryRoutes extends React.Component {


    render() {
        return (
            <Switch>
                {/*ITEM TYPE ROUTES*/}
                <Route exact path={"/ItemType"} component={ItemTypeContainer}/>
                <Route exact path={"/EditItemType"} component={EditItemTypeForm}/>
                <Route exact path={"/AddItemType"} component={AddItemTypeForm}/>
                {/*ROOM ROUTES*/}
                <Route exact path={"/Room"} component={RoomContainer}/>
                <Route exact path={"/EditRoom"} component={EditRoomForm}/>
                <Route exact path={"/AddRoom"} component={AddRoomForm}/>
                {/*ITEM ROUTES*/}
                <Route exact path={"/Item"} component={ShowItem}/>
                <Route exact path={"/AddItem"} component={AddItemContainer}/>
                <Route exact path={"/EditItem"} component={EditItemContainer}/>
    </Switch>
        );
    }


}

export default InventoryRoutes