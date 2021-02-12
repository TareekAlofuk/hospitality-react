import {Component} from "react";
import {Form, GlobalEvents} from "@autofiy/raf-core";
import {Text} from "@autofiy/raf-material";
import {Button} from "@material-ui/core";
import {Endpoints} from "../../../Shared/Endpoints/Endpoints";

class AddItemTypeForm extends Component {



    render() {
        return (<div style={{width: "30vw"}}>
                <Form fields={[
                    {as: Text, name: 'name', extra: {label: 'Item Type'}}
                ]}

                      listen={{
                          [GlobalEvents.SUBMIT_FAILED] : (form, data) => alert("ali")
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
                              url : Endpoints.item_type.add
                          }
                      }}
                />
            </div>
        );
    }

}

export default AddItemTypeForm