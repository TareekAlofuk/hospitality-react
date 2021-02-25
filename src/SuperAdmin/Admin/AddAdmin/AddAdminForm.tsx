import {Component} from "react";
import {Form, GlobalEvents,IForm} from "@autofiy/raf-core";
import {Text , Checkbox} from "@autofiy/raf-material";
import {Button , Grid , Box} from "@material-ui/core";
import {Endpoints} from "../../../Shared/Endpoints/Endpoints";
class AddAdminForm extends Component {



    render() {
        return (<Box  m={4} >
            <Grid  item  xs={12} >
                <Form fields={[
                    {as: Text, name: 'name', extra: {label:' name'}},
                    {as: Text, name: 'email', extra: {label:' email'}},
                    {as: Text, name: 'password', extra: {label:' password'}},
                    {as:Checkbox , name:'operations' , extra: {label:' operitions'}},
                    {as:Checkbox , name:'reports' , extra: {label:' reports'}},
                    {as:Checkbox , name:'inventory' , extra: {label:' inventory'}},
                    {as:Checkbox , name:'superAdmin' , extra: {label:' superAdmin'}}
                ]}

                      listen={{
                          [GlobalEvents.SUBMIT_FAILED] : (form, data) => {
                              if(JSON.parse(data.response).errors.email.path==='email'){
                                  alert('the email should be uniqu')
                              }
                          },
                          [GlobalEvents.SUBMIT_SUCCEEDED]: (form:IForm)=> {
                              alert('Added successfully')
                              form.value().clear()
                          }
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
                              url : Endpoints.admin.add
                          }
                      }}
                />
            </Grid>
        </Box>        );
    }

}

export default AddAdminForm