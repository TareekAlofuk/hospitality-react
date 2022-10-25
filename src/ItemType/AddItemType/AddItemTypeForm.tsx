import {Component} from "react";
import {Form, GlobalEvents} from "@autofiy/raf-core";
import {Text} from "@autofiy/raf-material";
import {Button, Grid} from "@material-ui/core";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {withRouter, RouteComponentProps} from 'react-router-dom'
import AxiosSubmitter from "../../AxiosSubmitter";
import {withStyles} from "@material-ui/core";


const styles = (theme:any)=> ({
    ButtonContainer:{
        width:"20vw"
    },

})




interface Props extends RouteComponentProps<any> {
    classes?:any

}

class AddItemTypeForm extends Component<Props> {


    render() {
        const {classes} = this.props
        return (
                <Grid item lg={4}>
                    <Form fields={[
                        {as: Text, name: 'name', extra: {label: 'اسم النوع'}}
                    ]}

                          listen={{
                              [GlobalEvents.SUBMIT_FAILED]: (form, data) => alert("Error")
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

export default withStyles(styles)(withRouter(AddItemTypeForm))