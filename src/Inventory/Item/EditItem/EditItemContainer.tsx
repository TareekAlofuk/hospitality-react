import {Endpoints} from "../../../Shared/Endpoints/Endpoints";
import Axios from 'axios'
import {Component} from "react";
import EditItemForm from "./EditItemForm"
import CircularProgress from '@material-ui/core/CircularProgress';
import {Alert} from '@material-ui/lab';
import {RouteComponentProps, withRouter} from "react-router-dom";


interface Props extends RouteComponentProps<any> {
    item: any
}


interface State {
    status: string,
    itemTypeRadios: any
}


class EditItemContainer extends Component<Props> {
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
        const {item}: any = this.props.location.state
        if (this.state.status === 'LOADING') {
            return <CircularProgress/>
        } else if (this.state.status === 'SUCESS') {
            return <EditItemForm itemTypeRadios={this.state.itemTypeRadios} item={item}/>
        } else {
            return <Alert severity="error">Ther is an error</Alert>
        }


    }


}

export default withRouter(EditItemContainer)