import {Component} from "react";
import {Form} from "@autofiy/raf-core";
import {Text} from "@autofiy/raf-material";
import {Box, Button, Grid} from "@material-ui/core";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {RouteComponentProps, withRouter} from "react-router-dom";
import AxiosSubmitter from "../../AxiosSubmitter";
import {withStyles} from "@material-ui/core";


const styles = (theme:any)=> ({
    buttonContainer:{
        width:"20vw"
    },

})

interface Props extends RouteComponentProps<any> {
    room: any
    classes?:any

}

class EditRoomForm extends Component<Props> {

    render() {
        const {classes} = this.props
        const {room}: any = this.props.location.state
        return (
            <Grid item lg={4}>
                <Form fields={[
                    {as: Text, name: 'name', extra: {label: 'أسم الغرفة'}}
                ]}
                      initialValues={room}
                      services={{
                          submitter: (form: any): any => new AxiosSubmitter(
                              form,
                              Endpoints.room.edit(room._id),
                              'PATCH',
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

export default withStyles(styles)(withRouter(EditRoomForm))