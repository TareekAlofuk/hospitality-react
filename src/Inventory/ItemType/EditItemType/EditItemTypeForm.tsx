import {Component} from "react";
import {Form} from "@autofiy/raf-core";
import {Text} from "@autofiy/raf-material";
import {Button , Grid , Box} from "@material-ui/core";
import {Endpoints} from "../../../Shared/Endpoints/Endpoints";
import {withRouter , RouteComponentProps} from "react-router-dom";




interface Props extends RouteComponentProps<any>  {
    itemType:any
}
class EditItemTypeForm extends Component<Props> {

    render() {
        const {itemType}:any = this.props.location.state
        return (<Box  m={4} >
            <Grid  item  xs={12} >
                <Form fields={[
                    {as: Text, name: 'name', extra: {label: 'Item Type'}}
                ]}
                      initialValues={itemType}

                      extra={{
                          renderOptions: {
                              actions: [
                                  (form: any) => <Button color={"primary"} variant={'contained'}
                                                         onClick={() => form.submit()}>EDIT</Button>
                              ],
                              actionsAlignments: "center"
                          },
                          submitOptions : {
                              method:'PATCH',
                              url : Endpoints.item_type.edit(itemType._id)
                          }
                      }}
                />
            </Grid>
        </Box>        );
    }

}

export default  withRouter(EditItemTypeForm)