import {Component} from "react";
import {Form, GlobalEvents} from "@autofiy/raf-core";
import {Text} from "@autofiy/raf-material";
import {Button , Grid , Box} from "@material-ui/core";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import AxiosSubmitter from "../../AxiosSubmitter";
import {withRouter , RouteComponentProps} from 'react-router-dom'


interface Props extends RouteComponentProps {

}

class AddRoomForm extends Component<Props> {



    render() {
        return (<Box  m={4} >
            <Grid  item  xs={12} >
                <Form fields={[
                    {as: Text, name: 'name', extra: {label: 'Room name'}}
                ]}

                      listen={{
                          [GlobalEvents.SUBMIT_FAILED] : (form, data) => alert("Error")
                      }}

                      services={{
                          submitter: (form: any): any => new AxiosSubmitter(
                              form,
                              Endpoints.room.add,
                              'POST',
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
                                                         onClick={() => form.submit()}>ADD</Button>
                              ],
                              actionsAlignments: "center"
                          },

                      }}
                />
            </Grid>
        </Box>        );
    }

}

export default withRouter(AddRoomForm)