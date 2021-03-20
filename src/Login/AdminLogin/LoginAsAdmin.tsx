import {Component} from "react";
import {Button, Grid, withStyles} from "@material-ui/core";
import {Form, GlobalEvents, IForm} from "@autofiy/raf-core";
import {Text} from "@autofiy/raf-material";
import {RouteComponentProps, withRouter} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {connect} from "react-redux";
import AxiosSubmitter from "../../AxiosSubmitter";

interface Props extends RouteComponentProps<any> {
    history: any
    classes?: any
    rooms: any
    dispatch?: any

}

const styles = (theme: any) => ({
    root: {
        height: "100%",
        backgroundColor: "#fff",
    },
    icon: {
        fontSize: theme.spacing(8),
        color: "#dcdcdc"
    },

})


class LoginAsAdmin extends Component<Props> {


    render() {
        const {classes} = this.props;
        return <Grid container className={classes.root} justify={"center"} alignItems={"center"}>


            <Grid item xs={10} md={2} style={{textAlign: "center"}}>
                <AccountCircleIcon className={classes.icon}/>

                <Form fields={[
                    {as: Text, name: 'email', extra: {label: 'البريد الالكتروني'}},
                    {as: Text, name: 'password', extra: {label: 'الرمز السري'}},
                ]}

                      // listen={{
                      //     [GlobalEvents.SUBMIT_FAILED]: (form, data) => {
                      //         console.log(data.response)
                      //     },
                      //     [GlobalEvents.SUBMIT_SUCCEEDED]: (form: IForm, data) => {
                      //         const permissions = JSON.parse(data.response).data.permissions;
                      //         console.log(permissions)
                      //         localStorage.setItem("jwt", JSON.parse(data.response).token)
                      //         this.props.dispatch(setPermission(permissions))
                      //         alert('login successfully')
                      //     }
                      // }}
                      services={{
                          submitter: (form: any): any => new AxiosSubmitter(
                              form,
                              Endpoints.admin.login,
                              'POST',
                              (data) => {
                                  const permissions = data.data.permissions;
                                  localStorage.setItem("jwt", data.token)
                                  permissions.client = false
                                  localStorage.setItem("permissions",JSON.stringify(permissions) )
                                  this.props.history.push('/')
                              },
                              () => {
                                  alert('there is an error')
                              }
                          )

                      }
                      }

                      extra={{
                          renderOptions: {
                              actions: [
                                  (form: any) => <Button color={"primary"} variant={'contained'}
                                                         onClick={() => form.submit()}>تسجيل</Button>
                              ],
                              actionsAlignments: "center",

                          },

                      }}
                />
            </Grid>


        </Grid>
    }
}

export default connect()(withRouter(withStyles(styles)(LoginAsAdmin)));