import {Component} from "react";
import {Button, Grid, withStyles} from "@material-ui/core";
import {Form } from "@autofiy/raf-core";
import {Select, Text} from "@autofiy/raf-material";
import LoginAsClientSubmitter from "./LoginAsClientSubmitter";
import {RouteComponentProps, withRouter} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

interface Props extends RouteComponentProps<any> {
    history:any
    classes?: any
    rooms:any

}

const styles = (theme:any) => ({
    root: {
        height: "100%",
        backgroundColor: "#fff",
    } ,
    icon:{
        fontSize:theme.spacing(8),
        color:"#dcdcdc"
    },

})


class LoginAsClient extends Component<Props> {



    render() {
        const {classes} = this.props;
        return <Grid container className={classes.root} justify={"center"} alignItems={"center"} >


            <Grid item xs={10} md={2}  style={{textAlign: "center"}}>
                <AccountCircleIcon className={classes.icon}/>

                <Form fields={[
                    {as: Text, name: 'clientName', extra: {label: 'الاسم'}},
                    {as: Select, name: 'roomName', extra: {
                        label: 'اسم الغرفة',
                            options: this.props.rooms

                        }}
                ]}


                      services={{
                          submitter: (form:any):any => new LoginAsClientSubmitter(form ,() => {
                              this.props.history.push('/')
                          })
                      }
                      }
                      extra={{
                          renderOptions: {
                              actions: [
                                  (form: any) => <Button color={"primary"} variant={'contained'}
                                                         onClick={() => form.submit()}>تسجيل</Button>
                              ],
                              actionsAlignments: "center"
                          },

                      }}
                />
            </Grid>


        </Grid>
    }
}

export default withRouter(withStyles(styles)(LoginAsClient))