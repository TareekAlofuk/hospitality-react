import React from "react";
import { Button, ButtonGroup, Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core";
import ReportByItemsCount from "./ReportByItemsCount/ReportByItemsCount";
import Reports from "./ReportByEmployeesName/Reports";

const styles = (theme: any) => ({
    root: {
        marginTop:"5vh",
    },
    table:{
        width:'100vw'
    }


})

class ReportContainer extends React.Component<any, any> {
    state = {
        statisticType:0
    }
    changeTypeToMonthly = (e:any) => {
        e.preventDefault() ;
        this.setState({statisticType:0 })
    }
    changeTypeToLast30Day = (e:any) => {
        e.preventDefault() ;
        this.setState({statisticType:1 })
    }
    changeTypeToYearly = (e:any) => {
        e.preventDefault() ;
        this.setState({statisticType:2})
    }


    render() {
        const {classes} = this.props
        return <Grid container item justify={"center"} alignItems={"center"} direction={"column"} className={classes.root}>
            <Grid item  >
                <ButtonGroup color="primary" aria-label="outlined primary button group" >
                    <Button onClick={this.changeTypeToMonthly}>شهرية</Button>
                    <Button onClick={this.changeTypeToYearly}>سنوية</Button>
                    <Button onClick={this.changeTypeToLast30Day}>اخر ثلاثين يوم</Button>
                </ButtonGroup>
            </Grid>
            {this.state.statisticType === 0 ?
            <Grid item className={classes.table}>
                <ReportByItemsCount month={0} year={0}/>
            </Grid> : " "
            }
            {this.state.statisticType === 1 ?
                <Grid item className={classes.table}>
                <Reports/>
                </Grid> : " "
            }
            {this.state.statisticType === 2 ?
                <Grid item className={classes.table}>

                </Grid> : " "
            }
        </Grid>
    }
}

export default withStyles(styles)(ReportContainer)