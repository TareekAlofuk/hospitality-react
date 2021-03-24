import {Component} from "react";
import {Box, Button, Checkbox, FormControlLabel, MenuItem, TextField} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {connect, ConnectedProps} from "react-redux";
import {setIsGuest, setName, setNote, setRoom} from "../../../Store/Action/OrderFormActions";
import {withStyles} from "@material-ui/core/styles";
import {Favorite, FavoriteBorder} from "@material-ui/icons";

interface Props {
    onSubmitOrder: any,
    classes?: any,
    orderMetaData: any;
    dispatch: any;
    room: any;
}

const connector = connect((store: any) => {
    return {
        orderMetaData: store.orderFormReducer.metadata
    }
})
type ReduxProps = ConnectedProps<typeof connector>

const styles = (theme: any) => ({
    root: {
        height:"auto"
    },
    input: {
        width: "100%",
    },
    button: {
        height: theme.spacing(6),
        width: "100%"
    }
});

class MetadataForm extends Component<Props & ReduxProps> {

    clientNameHandler = (event: any) => {
        this.props.dispatch(setName(event.target.value))
    }
    roomNameHandler = (event: any) => {
        this.props.dispatch(setRoom(event.target.value))
    }
    noteHandler = (event: any) => {
        this.props.dispatch(setNote(event.target.value))
    }

    isGustHandler = (event: any) => {
        this.props.dispatch(setIsGuest(event.target.checked))
    }

    render() {

        const {classes} = this.props;
        return (
            <Box className={classes.root} >
                <ValidatorForm onSubmit={this.props.onSubmitOrder} onError={errors => console.log(errors)}>
                    <TextValidator
                        label="الاسم"
                        className={classes.input}
                        onChange={this.clientNameHandler}
                        name="clientName"
                        value={this.props.orderMetaData.name}
                        validators={['required']}
                        autoComplete={"false"}
                        errorMessages={['عذرا ... يبدو انك نسيت كتابة الاسم']}
                    />

                    <br/><br/>


                    <TextValidator
                        name="roomName"
                        className={classes.input}
                        label="اسم الغرفة"
                        select
                        onChange={this.roomNameHandler}
                        value={this.props.orderMetaData.roomName}
                        validators={['required']}
                        autoComplete={"false"}
                        errorMessages={['عذرا ... يبدو انك نسيت اختيار الغرفة']}
                    >
                        {this.props.room.map((room: any) => (
                            <MenuItem key={room._id} value={room.name}>
                                {room.name}
                            </MenuItem>
                        ))}
                    </TextValidator>

                    <br/><br/>

                    <TextField
                        name={"note"}
                        className={classes.input}
                        label="ملاحضات"
                        onChange={this.noteHandler}
                        value={this.props.orderMetaData.note}
                        multiline
                        rows={4}
                    />

                    <br/><br/>

                    <FormControlLabel
                        className={classes.input}
                        control={
                            <Checkbox
                                checked={this.props.orderMetaData.isGust}
                                color={"secondary"}
                                onChange={this.isGustHandler}
                                name="isGust"
                                icon={<FavoriteBorder/>}
                                checkedIcon={<Favorite/>}
                            />
                        }
                        label="زائر"
                    /><br/>

                    <Button
                        variant="contained"
                        type="submit"
                        value="Submit"
                        color={"primary"}
                        className={classes.button}
                    >
                        اطلب الآن
                    </Button>
                </ValidatorForm>
            </Box>

        );
    }
}


export default withStyles(styles)(connector(MetadataForm))