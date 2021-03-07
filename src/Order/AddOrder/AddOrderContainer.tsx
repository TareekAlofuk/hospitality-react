import {Component} from "react";
import {Box, Grid} from "@material-ui/core";
import AddOrderItems from "./AddOrderItems";
import {connect, ConnectedProps} from 'react-redux'
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import Axios from "axios";
import {addItemToCart} from "../../Store/Action/Actions";
import {removeItemFromCart} from "../../Store/Action/Actions";
import {removeAllItemFromCart} from "../../Store/Action/Actions";
import {removeAllCart} from "../../Store/Action/Actions";
import AddOrderForm from "./AddOrderForm/AddOrderForm";


const mapStateToProps = (store: any) => {
    return {
        cart: store.cart
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addItemToCart: (item: any) => dispatch(addItemToCart(item)),
        removeItemFromCart: (item: any) => dispatch(removeItemFromCart(item)),
        removeAllItemFromCart: (item: any) => dispatch(removeAllItemFromCart(item)),
        removeAllCart: (item: any) => dispatch(removeAllCart(item))
    }
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>

class AddOrderContainer extends Component<Props> {
    state = {
        activeItems: [],
        loadItemsStatus: 'Loading'
    }
    getActiveItems = async () => {
        const apiUrl: string = Endpoints.item.getActiveItems;
        try {
            const response = await Axios.get(apiUrl);
            this.setState({activeItems: response.data, loadItemsStatus: 'Success'})
            console.log(response)

        } catch (e) {
            this.setState({activeItems: [], loadItemsStatus: 'Failed'})
        }
    }

    componentDidMount() {
        this.getActiveItems().then()
    }

    render() {
        if (this.state.loadItemsStatus === 'Loading') {
            return <h1>Loading</h1>
        } else if (this.state.loadItemsStatus === 'Success') {
            return (
                <Box>
                    <Grid container spacing={3} justify={"center"} alignItems={'center'}>
                        <Grid item md={4}>
                            <AddOrderForm cart={this.props.cart} removeItemFromCart={this.props.removeItemFromCart}
                                          addItemToCart={this.props.addItemToCart}
                                          removeAllItemFromCart={this.props.removeAllItemFromCart}
                                          removeAllCart={this.props.removeAllCart}/>
                        </Grid>
                        <Grid item md={8}>
                            <AddOrderItems activeItems={this.state.activeItems} addItemToCart={this.props.addItemToCart}
                                           removeItemFromCart={this.props.removeItemFromCart}
                                           removeAllItemFromCart={this.props.removeAllItemFromCart}
                                           cart={this.props.cart}/>
                        </Grid>

                    </Grid>
                </Box>
            );
        } else {
            return <h1>Error</h1>
        }
    }
}

export default connector(AddOrderContainer)