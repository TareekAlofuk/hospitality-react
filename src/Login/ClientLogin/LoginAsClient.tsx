import {Component} from "react";
import {Button, Grid, withStyles} from "@material-ui/core";
import {Form} from "@autofiy/raf-core";
import {Select, Text} from "@autofiy/raf-material";
import LoginAsClientSubmitter from "./LoginAsClientSubmitter";
import {RouteComponentProps, withRouter} from "react-router-dom";
import InterfaceImageWithText from "../../helperComponents/InterfaceImageWithText";

interface Props extends RouteComponentProps<any> {
    history: any
    classes?: any
    rooms: any

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


class LoginAsClient extends Component<Props> {


    render() {
        const {classes} = this.props;
        return <Grid container className={classes.root} justify={"center"} alignItems={"center"}>
            <Grid container  item lg={12} justify={"center"}
                  alignItems={"center"}>
                <InterfaceImageWithText imageSrc={"img/login.svg"} imageAlt={"login"} locationInMobileScreen={'top'}/>
            </Grid>

            <Grid item xs={10} lg={3}>
                <Form
                    fields={[
                        {as: Text, name: 'clientName', extra: {label: 'الاسم'}},
                        {
                            as: Select, name: 'roomName', extra: {
                                label: 'اسم الغرفة',
                                options: this.props.rooms
                            }
                        }
                    ]}


                    services={{
                        submitter: (form: any): any => new LoginAsClientSubmitter(form, () => {
                            window.open("/" , "_self");

                        })
                    }
                    }
                    extra={{
                        renderOptions: {
                            actions: [
                                (form: any) => <Button
                                    color={"primary"}
                                    variant={'contained'}
                                    className={classes.button}
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