import {Component} from "react";
import {Form} from "@autofiy/raf-core";
import {Text} from "@autofiy/raf-material";
import {Box, Button, Grid} from "@material-ui/core";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {RouteComponentProps, withRouter} from "react-router-dom";
import AxiosSubmitter from "../../AxiosSubmitter";


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
                      services={{
                          submitter: (form: any): any => new AxiosSubmitter(
                              form,
                              Endpoints.room.edit(room._id),
                              'PATCH',
                              () => {
                                  this.props.history.push('/Room')
                              },
                              (reqData: any, error: any) => {
                                  alert('there is an error')
                              })
                      }
                      }


                      extra={{
                          renderOptions: {
                              actions: [
                                  (form: any) => <Button color={"primary"} variant={'contained'}
                                                         onClick={() => form.submit()}>EDIT</Button>
                              ],
                              actionsAlignments: "center"
                          },

                      }}
                />
            </Grid>
        </Box>);
    }

}

export default withRouter(EditRoomForm)