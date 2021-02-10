import {Component} from "react";

interface ItemType {
    name: string;
    _id: string;
}

interface Props {
    ItemType : ItemType;
}

class ItemTypeCard extends Component<Props> {
    render() {
        return (
            <div>
                {this.props.ItemType.name}
            </div>
        );
    }
}

export default ItemTypeCard