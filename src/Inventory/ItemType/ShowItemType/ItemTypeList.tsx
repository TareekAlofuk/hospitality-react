import {Component} from "react";
import ItemTypeCard from "./ItemTypeCard";

interface Props {
    ItemTypes : any[];
}

class ItemTypeList extends Component<Props> {


    render() {
        const ItemTypes: any[] = this.props.ItemTypes
        return ItemTypes.map((ItemType, index) => <ItemTypeCard key={index} ItemType={ItemType}/>)
    }
}

export default ItemTypeList