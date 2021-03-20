import {Component} from 'react'
import InventoryRoutes from './InventoryRoutes'
import SuperAdminRoutes from './SuperAdminRoutes'
import ClientRoutes from "./ClientRoutes";
import PublicRoutes from "./PublicRoutes";
import OperationsRoutes from "./OperationsRoutes";

interface Props  {

}
class RoutesContainer extends Component<Props> {

    render() {
        const permissions =  JSON.parse(localStorage.getItem("permissions") || "{}");
        let routes:Array<any> = [] ;
        if (permissions.client || 0){
            routes.push(<ClientRoutes key={'client'}/>)
        }
        if (permissions.operations){
            routes.push(<OperationsRoutes key={'operations'}/>)
        }
        if (permissions.inventory){
            routes.push(<InventoryRoutes key={'inventory'}/>)
        }
        if (permissions.superAdmin){
            routes.push(<SuperAdminRoutes key={'superAdmin'}/>)
        }
        if (routes.length === 0 ){
            routes.push(<PublicRoutes key={'public'}/>)
        }

        return (
            <>
                {routes}
            </>
        );
    }

}



export default (RoutesContainer)