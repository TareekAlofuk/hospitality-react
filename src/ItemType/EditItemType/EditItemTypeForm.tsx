import {Component} from "react";
import {Form} from "@autofiy/raf-core";
import {Text} from "@autofiy/raf-material";
import {Button , Grid } from "@material-ui/core";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {withRouter , RouteComponentProps} from "react-router-dom";
import AxiosSubmitter from "../../AxiosSubmitter";
import {withStyles} from "@material-ui/core";


const styles = (theme:any)=> ({
    buttonContainer:{
        width:"20vw"
    },

})





interface Props extends RouteComponentProps<any>  {
    itemType:any
    classes?:any

}
class EditItemTypeForm extends Component<Props> {

    render() {
        const{classes} = this.props
        const {itemType}:any = this.props.location.state
        return (
            <Grid  item  lg={4} >
                <Form fields={[
                    {as: Text, name: 'name', extra: {label: 'اسم النوع'}}
                ]}
                      initialValues={itemType}
                      services={{
                          submitter: (form: any): any => new AxiosSubmitter(
                              form,
                              Endpoints.item_type.edit(itemType._id),
                              'PATCH',
                              () => {
                                  this.props.history.push('/ItemType')
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
                                                         className={classes.buttonContainer}
                                                         onClick={() => form.submit()}>تعديل</Button>
                              ],
                              actionsAlignments: "center"
                          },

                      }}
                />
            </Grid>
           );
    }

}

export default withStyles(styles)(withRouter(EditItemTypeForm))