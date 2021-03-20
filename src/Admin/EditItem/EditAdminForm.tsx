import {Component} from "react";
import {Form} from "@autofiy/raf-core";
import {Checkbox, Text} from "@autofiy/raf-material";
import {Box, Button, Grid} from "@material-ui/core";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {RouteComponentProps, withRouter} from "react-router-dom";
import AxiosSubmitter from "../../AxiosSubmitter";


interface Props extends RouteComponentProps<any> {
    admin: any
}

class EditAdminForm extends Component<Props> {


    render() {
        const {admin}: any = this.props.location.state
        return (<Box m={4}>
            <Grid item xs={12}>
                <Form fields={[
                    {as: Text, name: 'name', extra: {label: ' name'}},
                    {as: Text, name: 'email', extra: {label: ' email'}},
                    {as: Checkbox, name: 'operations', extra: {label: ' operations'}},
                    {as: Checkbox, name: 'reports', extra: {label: ' reports'}},
                    {as: Checkbox, name: 'inventory', extra: {label: ' inventory'}},
                    {as: Checkbox, name: 'superAdmin', extra: {label: ' superAdmin'}}
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
                                                         onClick={() => form.submit()}>Edit</Button>
                              ],
                              actionsAlignments: "center"
                          },


                      }}
                />
            </Grid>
        </Box>);
    }

}

export default withRouter(EditAdminForm)