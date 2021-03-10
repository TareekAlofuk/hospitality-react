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
    clientName: any,
    roomName: any,
    isGust: boolean,
    note: string,
    userId:any
}

const styles = () => ({
    root: {
        height: "100vh",
        padding: '16px'
    },
    input: {
        width: "100%",
    }
});

class AddOrderForm extends Component<Props> {
    state = {
        metadata: {
            clientName: localStorage.getItem("clientName"),
            roomName: localStorage.getItem("roomName"),
            isGust: false,
            note: "",
            userId:localStorage.getItem('userId')
        },
        postStatus: null,
        room: []
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
        this.setState({metadata: {...this.state.metadata, isGust: event.target.checked}});
    }


    clearTheForm = () => {
        this.setState({
            metadata: {
                ...this.state.metadata,
                isGust: false,
                note: ""
            },
        })
    }


    postOrder = async(cart: any[], metaData: metaData) => {

        await axios.post(Endpoints.Order.add, {
            items: cart,
            client: {
                clientName: metaData.clientName,
                roomName: metaData.roomName,
            },
            note: metaData.note,
            isGust: metaData.isGust,
            userId:metaData.userId
        })
    }
    getRoom = async () => {
        try {
            const res = await axios.get(Endpoints.room.get)
            this.setState({room: res.data})
        } catch (e) {
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

        if (cartInArray.length > 0) {

            try {
                await this.postOrder(cartInArray, metadata);
                this.props.removeAllCart()
                this.clearTheForm()
                this.setState({postStatus: true})
            } catch (e) {
                this.setState({postStatus: false})
                console.log("there is an error " + e)
            }
        } else {
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
                        className={classes.input}
                        label="الاسم"
                        onChange={this.clientNameHandler}
                        name="clientName"
                        value={this.state.metadata.clientName}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />


                    <TextValidator
                        className={classes.input}
                        name="roomName"
                        label="اسم الغرفة"
                        select
                        onChange={this.roomNameHandler}
                        value={this.state.metadata.roomName}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    >
                        {this.state.room.map((room: any) => (
                            <MenuItem key={room._id} value={room.name}>
                                {room.name}
                            </MenuItem>
                        ))}
                    </TextValidator>

                    <TextValidator
                        className={classes.input}
                        name={"note"}
                        label="ملاحضات"
                        onChange={this.noteHandler}
                        value={this.state.metadata.note}/>
                    <FormControlLabel
                        className={classes.input}

                        control={
                            <Checkbox
                                checked={this.state.metadata.isGust}
                                color={"primary"}
                                onChange={this.isGustHandler}
                                name="isGust"
                            />
                        }
                        label="زائر"
                    /><br/>

                    <Button className={classes.input}
                            variant="contained"
                            type="submit"
                            value="Submit"
                            color={"primary"}
                    >
                        ارسال
                    </Button>
                </ValidatorForm>
            </Box>

        );
    }
}

export default withStyles(styles)(AddOrderForm)