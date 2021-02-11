import {Component} from "react";
import ItemTypeCard from "./ItemTypeCard";

interface Props {
    ItemTypes: any[];
    onDelete: any
}

class ItemTypeList extends Component<Props> {


    render() {
        const ItemTypes: any[] = this.props.ItemTypes
        return ItemTypes.map((ItemType, index) => <ItemTypeCard key={index}
                                                                ItemType={ItemType}
                                                                onDelete={this.props.onDelete}/>)
    }
}

export default ItemTypeList