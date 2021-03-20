import {Component} from "react";
import { Grid} from "@material-ui/core";
import AddOrderItems from "./AddOrderItems";
import {connect, ConnectedProps} from 'react-redux'
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import Axios from "axios";
import {addItemToCart} from "../../Store/Action/CartActions";
import {removeItemFromCart} from "../../Store/Action/CartActions";
import {removeAllItemFromCart} from "../../Store/Action/CartActions";
import {removeAllCart} from "../../Store/Action/CartActions";
import {withStyles} from "@material-ui/core";
import AddOrderFormContainer from "./AddOrderForm/AddOrderFormContainer";

const mapStateToProps = (store: any) => {
    return {
        cart: store.cartReducers.cart
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addItemToCart: (item: any) => dispatch(addItemToCart(item)),
        removeItemFromCart: (item: any) => dispatch(removeItemFromCart(item)),
        removeAllItemFromCart: (item: any) => dispatch(removeAllItemFromCart(item)),
        removeAllCart: () => dispatch(removeAllCart())
    }
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

interface Props {
    classes?:any
}


const styles = () => ({
    root: {
        padding:"0"
    },

});

class AddOrderContainer extends Component<ReduxProps & Props> {
    state = {
        activeItems: [],
        loadItemsStatus: 'Loading'
    }
    getActiveItems = async () => {
        const apiUrl: string = Endpoints.item.getActiveItems;
        try {
            const response = await Axios.get(apiUrl);
            this.setState({activeItems: response.data, loadItemsStatus: 'Success'})

        } catch (e) {
            this.setState({activeItems: [], loadItemsStatus: 'Failed'})
        }
    }

    componentDidMount() {
        this.getActiveItems().then()
    }

    render() {
        const {classes} = this.props
        if (this.state.loadItemsStatus === 'Loading') {
            return <h1>Loading</h1>
        } else if (this.state.loadItemsStatus === 'Success') {
            return (
                    <Grid container  justify={"center"} alignItems={'center'} className={classes.root}>
                        <Grid item md={4}>
                            <AddOrderFormContainer cart={this.props.cart} removeItemFromCart={this.props.removeItemFromCart}
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
            );
        } else {
            return <h1>Error</h1>
        }
    }
}

export default withStyles(styles)(connector(AddOrderContainer))