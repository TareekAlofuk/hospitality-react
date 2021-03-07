import {Component} from "react";
import {Button, Checkbox, Box, FormControlLabel, MenuItem} from '@material-ui/core';
import CartContainer from "../../Cart/CartContainer";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import {Endpoints} from "../../../Shared/Endpoints/Endpoints";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

interface Props {
    cart: any,
    removeItemFromCart: any,
    removeAllItemFromCart: any,
    addItemToCart: any,
    removeAllCart: any,
    classes: any
}

interface metaData {
    clientName: string,
    roomName: string,
    isGust: boolean
    note: string
}

const styles = () => ({
    root: {
        backgroundColor: "#f1f1f1",
        height: "70vh",
        overflow: 'scroll',
        padding: '16px'
    }
});

class AddOrderForm extends Component<Props> {
    state = {
        metadata: {
            clientName: "",
            roomName: "",
            isGust: false,
            note: ""
        },
        postStatus: null ,
        room:[]
    }


    clientNameHandler = (event: any) => {
        this.setState({metadata: {...this.state.metadata, clientName: event.target.value}});
    }

    roomNameHandler = (event: any) => {
        this.setState({metadata: {...this.state.metadata, roomName: event.target.value}});
    }
    noteHandler = (event: any) => {
        this.setState({metadata: {...this.state.metadata, note: event.target.value}});
    }

    isGustHandler = (event: any) => {
        this.setState({metadata: {...this.state.metadata , isGust: event.target.checked}});
    }


    clearTheForm = () => {
        this.setState({
            metadata: {
                clientName: "",
                roomName: "",
                isGust: false,
                note: ""
            },
        })
    }


    postOrder = (cart: any[], metaData: metaData) => {

        axios.post(Endpoints.Order.add, {
            items: cart,
            client: {
                clientName: metaData.clientName,
                roomName: metaData.roomName,
            },
            note: metaData.note,
            isGust: metaData.isGust
        })
    }
    getRoom = async () => {
        try{
            const res  = await  axios.get(Endpoints.room.get)
            this.setState({room:res.data})
        }catch (e){
            alert("Can not load room names")
        }

    }


    onSubmitOrder = async (event: any) => {
        event.preventDefault()
        const {cart} = this.props
        const {metadata} = this.state
        const cartInArray: any[] = Object.keys(cart).map((key: any) => {
            return cart[key]
        });

        if (cartInArray.length > 0){

            try {
                await this.postOrder(cartInArray, metadata);
                this.props.removeAllCart()
                this.clearTheForm()
                this.setState({postStatus: true})
            } catch (e) {
                this.setState({postStatus: false})
                console.log("there is an error " + e)
            }
        }else {
            alert("Add at lest one item")
        }


    }
    componentDidMount() {
        this.getRoom()
    }


    render() {
        const {classes} = this.props;
        console.log(this.state.room)

        return (
            <Box className={classes.root}>
                <Box>
                    <CartContainer
                        cart={this.props.cart}
                        removeItemFromCart={this.props.removeItemFromCart}
                        addItemToCart={this.props.addItemToCart}
                        removeAllItemFromCart={this.props.removeAllItemFromCart}
                        removeAllCart={this.props.removeAllCart}
                    />
                </Box>
                <ValidatorForm onSubmit={this.onSubmitOrder} onError={errors => console.log(errors)}>
                    <TextValidator
                        label="your name"
                        onChange={this.clientNameHandler}
                        name="clientName"
                        value={this.state.metadata.clientName}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />


                    <TextValidator
                        name="roomName"
                        label="اسم الغرفة"
                        select
                        onChange={this.roomNameHandler}
                        value={this.state.metadata.roomName}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    >
                        {this.state.room.map((room:any) => (
                            <MenuItem key={room._id} value={room.name}>
                                {room.name}
                            </MenuItem>
                        ))}
                    </TextValidator>

                    <TextValidator
                        name={"note"}
                        label="write your note"
                        onChange={this.noteHandler}
                        value={this.state.metadata.note}/>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.metadata.isGust}
                                onChange={this.isGustHandler}
                                name="isGust"
                            />
                        }
                        label="Gust"
                    /><br/>

                    <Button variant="contained" type="submit" value="Submit">send order</Button>
                </ValidatorForm>
            </Box>

        );
    }
}

export default withStyles(styles)(AddOrderForm)