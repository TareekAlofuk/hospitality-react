import {Component} from "react";
import ItemTypeCard from "./ItemTypeCard";

class ItemTypeList extends Component<{ ItemTypes: any[] }> {


    render() {
        const ItemTypes: any[] = this.props.ItemTypes
        return  ItemTypes.map(ItemType => <ItemTypeCard ItemType={ItemType} />)
    }
}

export default ItemTypeList