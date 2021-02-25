import {Component} from "react";
import {Form, GlobalEvents} from "@autofiy/raf-core";
import {Text} from "@autofiy/raf-material";
import {Button , Grid , Box} from "@material-ui/core";
import {Endpoints} from "../../../Shared/Endpoints/Endpoints";

class AddRoomForm extends Component {



    render() {
        return (<Box  m={4} >
            <Grid  item  xs={12} >
                <Form fields={[
                    {as: Text, name: 'name', extra: {label: 'Room name'}}
                ]}

                      listen={{
                          [GlobalEvents.SUBMIT_FAILED] : (form, data) => alert("Error")
                      }}

                      extra={{
                          renderOptions: {
                              actions: [
                                  (form: any) => <Button color={"primary"} variant={'contained'}
                                                         onClick={() => form.submit()}>ADD</Button>
                              ],
                              actionsAlignments: "center"
                          },
                          submitOptions : {
                              url : Endpoints.room.add
                          }
                      }}
                />
            </Grid>
        </Box>        );
    }

}

export default AddRoomForm