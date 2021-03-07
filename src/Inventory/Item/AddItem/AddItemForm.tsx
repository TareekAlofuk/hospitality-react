import {Component} from "react";
import {Form, GlobalEvents} from "@autofiy/raf-core";
import {AutoUpload, Checkbox, KeyValueFormRenderer , SimpleFormRenderer , Radio, Text} from "@autofiy/raf-material";
import {Box, Button , Grid} from "@material-ui/core";
import {Endpoints} from "../../../Shared/Endpoints/Endpoints";

interface Props {
    itemTypeRadios: any
}


class AddItemForm extends Component<Props> {

    render() {
        const itemTypeRadios = this.props.itemTypeRadios
        console.log(itemTypeRadios)
        return (<Box  m={4} >
            <Grid  item  xs={12} >
                <Form fields={[
                    {as: Text, name: 'itemName', extra: {__label: 'ITEM NAME'}},
                    {
                        as: Radio, name: 'type', extra: {
                            __label: "Type",
                            options: itemTypeRadios
                        }
                    },
                    {as: Checkbox, name: 'isActive', extra: {label: 'Activity'}},
                    // {
                    //     as: AutoUpload, name: 'image', extra: {
                    //         __label: 'Add image',
                    //         uploadedFileExtractorFromResponse: (res: any) => {
                    //             const json = JSON.parse(res);
                    //             return Endpoints.item.image(json.url);
                    //         },
                    //         uploadOptions: {
                    //             url: Endpoints.item.uploadImage
                    //         }
                    //     }
                    // }

                ]}


                      services={{
                          formRenderer: (form: any) => new SimpleFormRenderer(form),
                      }}
                      initialValues={{'isActive': true}}

                      listen={{
                          [GlobalEvents.SUBMIT_FAILED]: (form, data) => alert("ERROR")
                      }}

                      extra={{

                          renderOptions: {
                              header: 'Add Item',
                              actions: [
                                  (form: any) => <Button color={"primary"} variant={'contained'}
                                                         onClick={() => form.submit()}>ADD</Button>
                              ],
                              actionsAlignments: "center"
                          },
                          submitOptions: {
                              url: Endpoints.item.add
                          }
                      }}
                />
            </Grid>
        </Box>        );
    }

}

export default AddItemForm