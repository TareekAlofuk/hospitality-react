import {Component} from 'react'
import InventoryRoutes from './InventoryRoutes'
import SuperAdminRoutes from './SuperAdminRoutes'
import OrderRoutes from "./OrderRoutes";

class RoutesContainer extends Component {


    render() {
        return (
            <>
            <InventoryRoutes/>
            <SuperAdminRoutes/>
            <OrderRoutes/>
            </>
        );
    }

}
export default RoutesContainer