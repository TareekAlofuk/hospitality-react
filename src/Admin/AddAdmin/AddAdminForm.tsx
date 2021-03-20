import {Component} from "react";
import {Form} from "@autofiy/raf-core";
import {Text, Checkbox} from "@autofiy/raf-material";
import {Button, Grid, Box} from "@material-ui/core";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import AxiosSubmitter from "../../AxiosSubmitter";
import {RouteComponentProps, withRouter} from "react-router-dom";


interface Props extends RouteComponentProps<any> {

}

class AddAdminForm extends Component<Props> {

    render() {

        return (<Box m={4}>
            <Grid item xs={12}>
                <Form fields={[
                    {as: Text, name: 'name', extra: {label: ' name'}},
                    {as: Text, name: 'email', extra: {label: ' email'}},
                    {as: Text, name: 'password', extra: {label: ' password'}},
                    {as: Checkbox, name: 'operations', extra: {label: ' operations'}},
                    {as: Checkbox, name: 'reports', extra: {label: ' reports'}},
                    {as: Checkbox, name: 'inventory', extra: {label: ' inventory'}},
                    {as: Checkbox, name: 'superAdmin', extra: {label: ' superAdmin'}}
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
                                                         onClick={() => form.submit()}>ADD</Button>
                              ],
                              actionsAlignments: "center"
                          },

                      }}
                />
            </Grid>
        </Box>);
    }

}

export default withRouter(AddAdminForm)