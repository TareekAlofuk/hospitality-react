import {Endpoints} from "../../../Shared/Endpoints/Endpoints";
import Axios from 'axios'
import {Component} from "react";
import AddItemForm from "./AddItemForm"
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';

interface State {
    status: string,
    itemTypeRadios: any
}


class AddItemContainer extends Component {
    state: State = {
        status: 'LOADING',
        itemTypeRadios: []
    }

    getData = async () => {
        const apiUrl: string = Endpoints.item_type.get
        const response = await Axios.get(apiUrl);
        return response.data
    };


    componentDidMount() {
        this.getData().then(data => {
            const itemTypes: any[] = data
            itemTypes.map(itemType => {
                // this.state.itemTypeRadios.push({text:itemType.name , value:itemType.name})
                this.setState((prevState: any) => ({
                    itemTypeRadios: [...prevState.itemTypeRadios, {
                        text: itemType.name,
                        value: itemType.name
                    }], status: 'SUCESS'
                }))
            })
        }).catch(e => {
            this.setState({itemTypeRadios: [], status: 'ERROR'})
        })

    }

    render() {
        if (this.state.status === 'LOADING') {
            return <CircularProgress/>
        }else if(this.state.status === 'SUCESS'){
            return <AddItemForm itemTypeRadios={this.state.itemTypeRadios}/>
        }else {
            return <Alert severity="error">Ther is an error</Alert>
        }


    }


}

export default AddItemContainer