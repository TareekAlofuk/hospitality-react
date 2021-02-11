import {Component} from "react";
import {Button} from "@material-ui/core";
import {Endpoints} from "../../../Shared/Endpoints/Endpoints";
import Axios from "axios";

interface ItemType {
    name: string;
    _id: string;
}

interface Props {
    ItemType: ItemType;
    onDelete:any;

}

class ItemTypeCard extends Component<Props> {



    deleteItemType = async () => {
        const ItemTypeId = this.props.ItemType._id ;

        try {
            await Axios.delete(Endpoints.item_type.delete(ItemTypeId));
            this.props.onDelete(ItemTypeId)
        }catch (e){
            console.log(e)
        }
    }

    render() {
        const name  = this.props.ItemType.name
        return (
            <div>
                <div>{name}</div>
                <Button
                    variant={"contained"}
                    onClick={this.deleteItemType}
                >
                    Delete
                </Button>
            </div>
        );
    }
}

export default ItemTypeCard