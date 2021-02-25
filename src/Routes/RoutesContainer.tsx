import {Component} from 'react'
import InventoryRoutes from './InventoryRoutes'
import SuperAdminRoutes from './SuperAdminRoutes'
import { Switch} from "react-router-dom";

class RoutesContainer extends Component {


    render() {
        return (
            <Switch>
            <SuperAdminRoutes/>
            <RoutesContainer/>
            </Switch>
        );
    }

}
export default RoutesContainer