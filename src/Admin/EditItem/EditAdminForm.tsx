import {Component} from "react";
import {Form} from "@autofiy/raf-core";
import {Checkbox, Text} from "@autofiy/raf-material";
import {Box, Button, Grid} from "@material-ui/core";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {RouteComponentProps, withRouter} from "react-router-dom";
import AxiosSubmitter from "../../AxiosSubmitter";
import {withStyles} from "@material-ui/core";


const styles = (theme:any)=>({
    submitButton:{
        height: theme.spacing(6),
        width: theme.spacing(30)
    }
})

interface Props extends RouteComponentProps<any> {
    classes?:any
}

interface Props extends RouteComponentProps<any> {
    admin: any
}

class EditAdminForm extends Component<Props> {


    render() {
        const {classes}=this.props
        const {admin}: any = this.props.location.state
        return (
            <Grid item lg={3}>
                <Form fields={[
                    {as: Text, name: 'name', extra: {label: ' الاسم'}},
                    {as: Text, name: 'email', extra: {label: ' الاميل'}},
                    {as: Checkbox, name: 'operations', extra: {label: ' اتمام طلبات'}},
                    {as: Checkbox, name: 'reports', extra: {label: ' انشاء تقارير'}},
                    {as: Checkbox, name: 'inventory', extra: {label: ' عمل تعديلات'}},
                    {as: Checkbox, name: 'superAdmin', extra: {label: ' اضافة/تعديل مسؤلين'}}
                ]}

                    // listen={{
                    //     [GlobalEvents.SUBMIT_FAILED]: (form, data) => {
                    //         if (JSON.parse(data.response).errors.email.path === 'email') {
                    //             alert('the email should be uniqu')
                    //         }
                    //     },
                    //     [GlobalEvents.SUBMIT_SUCCEEDED]: (form: IForm) => {
                    //         console.log('admin')
                    //         this.props.history.push('/Admin');
                    //     }
                    // }}

                      initialValues={
                          {
                              name: admin.name,
                              email: admin.email,
                              operations: admin.permissions.operations,
                              reports: admin.permissions.reports,
                              inventory: admin.permissions.inventory,
                              superAdmin:admin.permissions.superAdmin
                          }
                      }
                      services={{
                          submitter: (form: any): any => new AxiosSubmitter(
                              form,
                              Endpoints.admin.edit(admin._id),
                              'PATCH',
                              () => {
                                  this.props.history.push('/Admin')
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
                                                         className={classes.submitButton}
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

export default withStyles(styles)(withRouter(EditAdminForm))