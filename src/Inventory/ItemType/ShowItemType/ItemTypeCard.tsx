import {Component} from "react";

export interface ItemType {
    name: string;
    _id: string;
}

class ItemTypeCard extends Component<{ ItemType: ItemType }> {
    render() {
        return (
            <div>
                {this.props.ItemType.name}
            </div>
        );
    }
}

export default ItemTypeCard