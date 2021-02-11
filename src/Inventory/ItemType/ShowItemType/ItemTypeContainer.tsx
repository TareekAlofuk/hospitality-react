import React from "react";
import Axios from "axios";
import ItemTypeList from "./ItemTypeList";
import {Endpoints} from "../../../Shared/Endpoints/Endpoints";





class ItemTypeContainer extends React.Component {

    state = {data: [], status: 'LOADING'};

     getData = async () => {
        const apiUrl: string = Endpoints.item_type.get
        const response = await Axios.get(apiUrl);
        return response.data
    };
     onDelete = (id:string) =>{
        const itemTypeAfterDelete =  this.state.data.filter((itemType:any) => itemType._id !== id);
        this.setState({data:itemTypeAfterDelete})
     }


    componentDidMount() {
        this.getData().then(data => {
            console.log(data)
            this.setState({data: data, status: 'SUCCESS'})
        }).catch(e => {
            this.setState({data: [], status: 'ERROR'})
        })
    }


    render() {
        if (this.state.status === 'LOADING') {
            return <div>Loading</div>
        } else if (this.state.status === 'SUCCESS') {
            if (this.state.data.length) {
                return <ItemTypeList onDelete={this.onDelete} ItemTypes={this.state.data} />
            } else {
                return <div>their is no item type available</div>

            }
        } else {
            return <div>Error</div>
        }
    }
}


export default ItemTypeContainer