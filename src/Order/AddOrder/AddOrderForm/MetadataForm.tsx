import {Component} from "react";
import {Button, Checkbox, FormControlLabel, MenuItem} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {connect, ConnectedProps} from "react-redux";
import {setIsGuest, setName, setNote, setRoom} from "../../../Store/Action/OrderFormActions";
import {withStyles} from "@material-ui/core/styles";

interface Props {
    onSubmitOrder:any,
    classes?:any,
    orderMetaData: any;
    dispatch : any;
    room:any;
}

const connector = connect((store:any) => {
    return {
        orderMetaData : store.orderFormReducer.metadata
    }
})
type ReduxProps = ConnectedProps<typeof connector>

const styles = () => ({
    root: {
        height: "100vh",
        padding: '16px'
    },
    input: {
        width: "100%",
    }
});

class MetadataForm extends Component<Props&ReduxProps> {



    clientNameHandler = (event: any) => {
        event.preventDefault();
        this.props.dispatch(setName(event.target.value))
    }

    roomNameHandler = (event: any) => {
        event.preventDefault();
        this.props.dispatch(setRoom(event.target.value))
    }
    noteHandler = (event: any) => {
        event.preventDefault();
        this.props.dispatch(setNote(event.target.value))
    }

    isGustHandler = (event: any) => {
        event.preventDefault();
        this.props.dispatch(setIsGuest( event.target.checked))
    }


    render() {
        const {classes} = this.props;

        console.log(this.props.orderMetaData)
        return (
            <>
                <ValidatorForm onSubmit={this.props.onSubmitOrder} onError={errors => console.log(errors)}>
                    <TextValidator
                        label="الاسم"
                        className={classes.input}
                        onChange={this.clientNameHandler}
                        name="clientName"
                        value={this.props.orderMetaData.name}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />


                    <TextValidator
                        name="roomName"
                        className={classes.input}
                        label="اسم الغرفة"
                        select
                        onChange={this.roomNameHandler}
                        value={this.props.orderMetaData.roomName}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    >
                        {this.props.room.map((room: any) => (
                            <MenuItem key={room._id} value={room.name}>
                                {room.name}
                            </MenuItem>
                        ))}
                    </TextValidator>

                    <TextValidator
                        name={"note"}
                        className={classes.input}
                        label="ملاحضات"
                        onChange={this.noteHandler}
                        value={this.props.orderMetaData.note}/>
                    <FormControlLabel
                        className={classes.input}
                        control={
                            <Checkbox
                                checked={this.props.orderMetaData.isGuest}
                                color={"primary"}
                                onChange={this.isGustHandler}
                                name="isGust"
                            />
                        }
                        label="زائر"
                    /><br/>

                    <Button
                            variant="contained"
                            type="submit"
                            value="Submit"
                            color={"primary"}
                    >
                        ارسال
                    </Button>
                </ValidatorForm>
            </>

        );
    }
}




export default withStyles(styles)( connector(MetadataForm))