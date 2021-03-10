import {Component} from 'react'
import InventoryRoutes from './InventoryRoutes'
import SuperAdminRoutes from './SuperAdminRoutes'
import OrderRoutes from "./OrderRoutes";
import LoginRoutes from "./LoginRoutes";

class RoutesContainer extends Component {


    render() {
        return (
            <>
            <InventoryRoutes/>
            <SuperAdminRoutes/>
            <OrderRoutes/>
            <LoginRoutes/>
            </>
        );
    }

}
export default RoutesContainer