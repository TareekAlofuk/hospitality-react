import {Component} from "react";
import {Form} from "@autofiy/raf-core";
import {Text, Checkbox, Password} from "@autofiy/raf-material";
import {Button, Grid, Box} from "@material-ui/core";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import AxiosSubmitter from "../../AxiosSubmitter";
import {RouteComponentProps, withRouter} from "react-router-dom";
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

class AddAdminForm extends Component<Props> {

    render() {
        const {classes} = this.props
        return ( <Grid item lg={4}>
                <Form fields={[
                    {as: Text, name: 'name', extra: {label: ' الاسم'}},
                    {as: Text, name: 'email', extra: {label: ' الاميل'}},
                    {as: Password, name: 'password', extra: {label: ' الرمز السري'}},
                    {as: Checkbox, name: 'operations', extra: {label: ' اتمام طلبات'}},
                    {as: Checkbox, name: 'reports', extra: {label: ' انشاء تقارير'}},
                    {as: Checkbox, name: 'inventory', extra: {label: ' عمل تعديلات'}},
                    {as: Checkbox, name: 'superAdmin', extra: {label: 'اضافة/تعديل مسؤلين'}}
                ]}

                      // listen={{
                      //     [GlobalEvents.SUBMIT_FAILED]: (form, data) => {
                      //         // if(JSON.parse(data.response).errors.email.path==='email'){
                      //         //     alert('the email should be uniqu')
                      //         // }
                      //         console.log(data.response)
                      //     },
                      //     [GlobalEvents.SUBMIT_SUCCEEDED]: (form: IForm, data) => {
                      //     }
                      // }}

                      services={{
                          submitter: (form: any): any => new AxiosSubmitter(
                              form,
                              Endpoints.admin.add,
                              'POST',
                              () => {
                                  this.props.history.push('/Admin')
                              },
                              ()=>{
                                  alert('there is an error')
                              }
                          )

                      }
                      }

                      extra={{
                          renderOptions: {
                              actions: [
                                  (form: any) => <Button color={"primary"} variant={'contained'}
                                                         className={classes.submitButton}
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

export default withStyles(styles)(withRouter(AddAdminForm))