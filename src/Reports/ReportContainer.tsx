import React from "react";
import { Box, Button, ButtonGroup, Grid, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import ReportByItemsCount from "./ReportByItemsCount/ReportByItemsCount";
import Reports from "./ReportByEmployeesName/Reports";
import MonthlyCompleteReport from "./MonthlyCompleteReport/MonthlyCompleteReport";
import axios from "axios";
import { Endpoints } from "../Shared/Endpoints/Endpoints";

const styles = (theme: any) => ({
    root: {
        marginTop: "5vh",
        width: '100vw'
    },
    table: {
        width: '100vw'
    },
    searchBox: {
        marginTop: "2vh",
    }


})

class ReportContainer extends React.Component<any, any> {
    state = {
        statisticType: 0,
        month: 0,
        CompleteMonthlyReportData:[]
    }
    changeTypeToMonthly = (e: any) => {
        e.preventDefault();
        this.setState({ statisticType: 0 })
    }
    changeTypeToLast30Day = (e: any) => {
        e.preventDefault();
        this.setState({ statisticType: 1 })
    }


    getDataOfCompleteMonthlyReport = async (month:number) => {
        try {
            const data = await axios.get(Endpoints.report.MonthlyCompleteReport(month))
            this.setState({CompleteMonthlyReportData: data.data })
        } catch (error) {
            alert(error)
        }
    }
    changeTypeToCompleteMonthlyReport = async () => {
             await this.getDataOfCompleteMonthlyReport(this.state.month)
            this.setState({ statisticType: 2 })
    }

    setMonth = async (e:any ) => {
        if (e.key === 'Enter') {
            this.setState({ month: (e.target.value || 0) });
            (this.state.statisticType===2) &&  await this.getDataOfCompleteMonthlyReport(e.target.value|| 0)
        }
    }


    render() {
        const { classes } = this.props
        return <Grid container item justify={"center"} alignItems={"center"} direction={"column"} className={classes.root}>
            <Grid item  >
                <ButtonGroup color="primary" aria-label="outlined primary button group" >
                    <Button onClick={this.changeTypeToMonthly}>شهرية</Button>
                    <Button onClick={this.changeTypeToLast30Day}>اخر ثلاثين يوم</Button>
                    <Button onClick={this.changeTypeToCompleteMonthlyReport}>تقرير كامل بالأشهر</Button>
                </ButtonGroup>
                <Box className={classes.searchBox}>
                    <Input type="number" placeholder="شهر من الآن" onKeyDown={this.setMonth} />
                </Box>
            </Grid>
            {this.state.statisticType === 0 ?
                <Grid item className={classes.table}>
                    <ReportByItemsCount month={this.state.month} year={0} />
                </Grid> : " "
            }
            {this.state.statisticType === 1 ?
                <Grid item className={classes.table}>
                    <Reports />
                </Grid> : " "
            }
            {this.state.statisticType === 2 ?
                     <MonthlyCompleteReport clients={this.state.CompleteMonthlyReportData}  />
                : " "
            }
        </Grid>
    }
}

export default withStyles(styles)(ReportContainer)