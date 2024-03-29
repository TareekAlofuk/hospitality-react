import {Component} from "react";
import {Button, Grid, withStyles} from "@material-ui/core";
import {Form} from "@autofiy/raf-core";
import {Password, Text} from "@autofiy/raf-material";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {connect} from "react-redux";
import AxiosSubmitter from "../../AxiosSubmitter";
import InterfaceImageWithText from "../../helperComponents/InterfaceImageWithText";

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
    button: {
        height: theme.spacing(6),
        width: theme.spacing(30)
    },


})


class LoginAsAdmin extends Component<Props> {


    render() {
        const {classes} = this.props;
        return <Grid container className={classes.root} justify={"center"} alignItems={"center"}>

            <Grid container  item lg={12} justify={"center"} alignItems={"center"}>
                <InterfaceImageWithText imageSrc={"img/login.svg"} imageAlt={"login"} locationInMobileScreen={"top"} />
            </Grid>

            <Grid item xs={10} lg={3}>
                <Form fields={[
                    {as: Text, name: 'email', extra: {label: 'البريد الالكتروني'}},
                    {as: Password, name: 'password', extra: {label: 'الرمز السري'}},
                ]}

                  
                      services={{
                          submitter: (form: any): any => new AxiosSubmitter(
                              form,
                              Endpoints.admin.login,
                              'POST',
                              (data) => {
                                  const permissions = data.data.permissions;
                                  localStorage.setItem("jwt", data.token)
                                  permissions.client = false
                                  localStorage.setItem("permissions", JSON.stringify(permissions))
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
                                                         className={classes.button}
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