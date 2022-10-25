import {Component} from "react";
import {Form, GlobalEvents} from "@autofiy/raf-core";
import {Text} from "@autofiy/raf-material";
import {Button , Grid } from "@material-ui/core";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import AxiosSubmitter from "../../AxiosSubmitter";
import {withRouter , RouteComponentProps} from 'react-router-dom'
import {withStyles} from "@material-ui/core";


const styles = (theme:any)=> ({
    buttonContainer:{
        width:"20vw"
    },
})

interface Props extends RouteComponentProps {
classes?:any
}

class AddRoomForm extends Component<Props> {



    render() {
        const {classes} = this.props
        return (
            <Grid  item  lg={4} >
                <Form fields={[
                    {as: Text, name: 'name', extra: {label: 'أسم الغرفة'}}
                ]}

                      listen={{
                          [GlobalEvents.SUBMIT_FAILED] : (form, data) => alert("Error")
                      }}

                      services={{
                          submitter: (form: any): any => new AxiosSubmitter(
                              form,
                              Endpoints.room.add,
                              'POST',
                              () => {
                                  this.props.history.push('/Room')
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

export default withStyles(styles)(withRouter(AddRoomForm))