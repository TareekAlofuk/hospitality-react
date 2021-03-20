import {Component} from "react";
import {Form, GlobalEvents} from "@autofiy/raf-core";
import {Text} from "@autofiy/raf-material";
import {Button, Grid, Box} from "@material-ui/core";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {withRouter, RouteComponentProps} from 'react-router-dom'
import AxiosSubmitter from "../../AxiosSubmitter";

interface Props extends RouteComponentProps<any> {

}

class AddItemTypeForm extends Component<Props> {


    render() {
        return (<Box m={4}>
                <Grid item xs={12}>
                    <Form fields={[
                        {as: Text, name: 'name', extra: {label: 'Item Type'}}
                    ]}

                          listen={{
                              [GlobalEvents.SUBMIT_FAILED]: (form, data) => alert("ali")
                          }}

                          services={{
                              submitter: (form: any): any => new AxiosSubmitter(
                                  form,
                                  Endpoints.item_type.add,
                                  'POST',
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
                                  header: 'Add Item type',

                                  actions: [
                                      (form: any) => <Button color={"primary"} variant={'contained'}
                                                             onClick={() => form.submit()}>ADD</Button>
                                  ],
                                  actionsAlignments: "center"
                              },

                          }}
                    />
                </Grid>
            </Box>
        );
    }

}

export default withRouter(AddItemTypeForm)