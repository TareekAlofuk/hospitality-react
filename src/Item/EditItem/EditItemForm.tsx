import {Component} from "react";
import {Form, GlobalEvents} from "@autofiy/raf-core";
import {Checkbox, KeyValueFormRenderer, Radio, Text} from "@autofiy/raf-material";
import {Box, Button, Grid} from "@material-ui/core";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import AxiosSubmitter from "../../AxiosSubmitter";
import {RouteComponentProps, withRouter} from "react-router-dom";


interface Props extends RouteComponentProps<any> {
    itemTypeRadios: any,
    item: any
}


class EditItemForm extends Component<Props> {


    render() {
        const itemTypeRadios = this.props.itemTypeRadios
        console.log(this.props.item)
        return (<Box m={4}>
            <Grid item xs={12}>
                <Form fields={[
                    {as: Text, name: 'itemName', extra: {__label: 'ITEM NAME'}},
                    {
                        as: Radio, name: 'type', extra: {
                            __label: "Type",
                            options: itemTypeRadios
                        }
                    },
                    {as: Checkbox, name: 'isActive', extra: {__label: 'Activity'}},
                    // {
                    // as:AutoUpload, name: 'image'   , extra: {
                    //     __label: 'Add image',
                    //             uploadOptions : {
                    //             url : Endpoints.item.uploadImage
                    //             }
                    // }
                    // }

                ]}


                      services={{
                          formRenderer: (form: any) => new KeyValueFormRenderer(form),
                          submitter: (form: any): any => new AxiosSubmitter(
                              form,
                              Endpoints.item.edit(this.props.item._id),
                              'PATCH',
                              () => {
                                  this.props.history.push('/Item')
                              },
                              (reqData: any, error: any) => {
                                  alert('there is an error')
                              }
                          )
                      }}
                      initialValues={this.props.item}

                      listen={{
                          [GlobalEvents.SUBMIT_FAILED]: (form, data) => alert("ERROR")
                      }}

                      extra={{

                          renderOptions: {
                              header: 'Add Item',
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

export default withRouter(EditItemForm)