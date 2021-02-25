import {Component} from "react";
import {Form} from "@autofiy/raf-core";
import {Text} from "@autofiy/raf-material";
import {Box, Button, Grid} from "@material-ui/core";
import {Endpoints} from "../../../Shared/Endpoints/Endpoints";
import {RouteComponentProps, withRouter} from "react-router-dom";


interface Props extends RouteComponentProps<any> {
    room: any
}

class EditRoomForm extends Component<Props> {

    render() {
        const {room}: any = this.props.location.state
        return (<Box m={4}>
            <Grid item xs={12}>
                <Form fields={[
                    {as: Text, name: 'name', extra: {label: 'Room name'}}
                ]}
                      initialValues={room}

                      extra={{
                          renderOptions: {
                              actions: [
                                  (form: any) => <Button color={"primary"} variant={'contained'}
                                                         onClick={() => form.submit()}>EDIT</Button>
                              ],
                              actionsAlignments: "center"
                          },
                          submitOptions: {
                              method: 'PATCH',
                              url: Endpoints.room.edit(room._id)
                          }
                      }}
                />
            </Grid>
        </Box>);
    }

}

export default withRouter(EditRoomForm)