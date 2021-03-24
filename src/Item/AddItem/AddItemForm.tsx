import {Component} from "react";
import {Form} from "@autofiy/raf-core";
import {AutoUpload, Checkbox, KeyValueFormRenderer , SimpleFormRenderer , Radio, Text} from "@autofiy/raf-material";
import {Box, Button , Grid} from "@material-ui/core";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import AxiosSubmitter from "../../AxiosSubmitter";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";


const styles = (theme:any)=> ({
    ButtonContainer:{
        width:"20vw"
    },

})



interface Props extends RouteComponentProps<any> {
    itemTypeRadios: any
    classes?:any
}


class AddItemForm extends Component<Props> {

    render() {
        const {classes} = this.props
        const itemTypeRadios = this.props.itemTypeRadios
        return (
            <Grid  item  lg={4} >
                <Form fields={[
                    {as: Text, name: 'itemName', extra: {label: 'اسم العنصر'}},
                    {
                        as: Radio, name: 'type', extra: {
                            __label: "Type",
                            options: itemTypeRadios
                        }
                    },
                    {as: Checkbox, name: 'isActive', extra: {label: 'نشط'}},
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
                      initialValues={{'isActive': true}}


                      services={{
                          formRenderer: (form: any) => new SimpleFormRenderer(form),
                          submitter: (form: any): any => new AxiosSubmitter(
                              form,
                              Endpoints.item.add,
                              'POST',
                              () => {
                                  this.props.history.push('/Item')
                              },
                              (reqData:any , error:any)=>{
                                  alert('there is an error')
                              }
                          )
                      }}





                      extra={{

                          renderOptions: {
                              actions: [
                                  (form: any) => <Button color={"primary"} variant={'contained'}
                                                         className={classes.ButtonContainer}
                                                         onClick={() => form.submit()}>اضافة</Button>
                              ],
                              actionsAlignments: "center"
                          },

                      }}
                />
            </Grid>
               );
    }

}

export default withStyles(styles)(withRouter(AddItemForm))