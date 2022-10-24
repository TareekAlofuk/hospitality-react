import React from "react";
import { Box, Button, ButtonGroup, Grid, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import ReportByItemsCount from "./ReportByItemsCount/ReportByItemsCount";
import Reports from "./ReportByEmployeesName/Reports";
import MonthlyCompleteReport from "./MonthlyCompleteReport/MonthlyCompleteReport";
import axios from "axios";
import { Endpoints } from "../Shared/Endpoints/Endpoints";
import RequestedItemsByEmployees from "./RequestedItemsByEmployees/RequestedItemsByClients";

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

enum LoadingStatus {
    LOADING = 0,
    SUCCESS = 1,
    ERROR = 2,
}

enum statisticType {
    ReportByItemsCount = 0 ,
    Reports =1 ,
    MonthlyCompleteReport =2,
    RequestedItemsByEmployees=3
}

interface State  {
    statisticType:statisticType,
    month:number,
    CompleteMonthlyReportData: [],
    RequestedItemsByClients:[],
    status:LoadingStatus
}
class ReportContainer extends React.Component<any, any> {


    state:State = {
        statisticType: 0,
        month: 0,
        CompleteMonthlyReportData: [],
        RequestedItemsByClients:[],
        status:0
    }
    changeTypeToMonthly = (e: any) => {
        e.preventDefault();
        this.setState({ statisticType: 0 ,  status:0 })
    }
    changeTypeToLast30Day = (e: any) => {
        e.preventDefault();
        this.setState({ statisticType: 1 , status:0 })
    }


    getDataOfCompleteMonthlyReport = async (month: number) => {
        try {
            const data = await axios.get(Endpoints.report.MonthlyCompleteReport(month))
            this.setState({ CompleteMonthlyReportData: data.data , status:1 })
        } catch (error) {
            alert(error)
        }
    }

    getDataOfRequestedItemsByClients = async (month: number) => {
        try {
            const data = await axios.get(Endpoints.report.RequestedItemsByClients(month))
            this.setState({ RequestedItemsByClients: data.data , status:1})
        } catch (error) {
            this.setState({ status:2})
        }
    }
    changeTypeToCompleteMonthlyReport = async () => {
        this.setState({ statisticType: 2 , status:0 })
        await this.getDataOfCompleteMonthlyReport(this.state.month)
    }
    changeTypeToRequestedItemsByClients = async () => {
        this.setState({ statisticType: 3 , status:0 })
        await this.getDataOfRequestedItemsByClients(this.state.month)
    }
    
    setMonth = async (e: any) => {
        if (e.key === 'Enter') {
            this.setState({ month: (e.target.value || 0) });
            (this.state.statisticType === 2) && await this.getDataOfCompleteMonthlyReport(e.target.value || 0);
            (this.state.statisticType === 3) && await this.getDataOfRequestedItemsByClients(e.target.value || 0);
        }
    }

   

    render() {
        const { classes } = this.props
        const {status , statisticType , month , CompleteMonthlyReportData ,RequestedItemsByClients } = this.state
        return <Grid container item justify={"center"} alignItems={"center"} direction={"column"} className={classes.root}>
            <Grid item>
                <ButtonGroup color="primary" aria-label="outlined primary button group" >
                    <Button onClick={this.changeTypeToMonthly}>شهرية</Button>
                    <Button onClick={this.changeTypeToLast30Day}>اخر ثلاثين يوم</Button>
                    <Button onClick={this.changeTypeToCompleteMonthlyReport}>تقرير كامل بالأشهر</Button>
                    <Button onClick={this.changeTypeToRequestedItemsByClients}>المواد المطلوبة حسب الموظف</Button>
                </ButtonGroup>
                <Box className={classes.searchBox}>
                    <Input type="number" placeholder="شهر من الآن" onKeyDown={this.setMonth} />
                </Box>
            </Grid>
            {statisticType === 0 ?
                <Grid item className={classes.table}>
                    <ReportByItemsCount month={month} year={0} />
                </Grid> : " "
            }
            {statisticType === 1 ?
                <Grid item className={classes.table}>
                    <Reports />
                </Grid> : " "
            }
            {statisticType === 2  ?
                <MonthlyCompleteReport clients={CompleteMonthlyReportData} />
                : " "
            }
            {statisticType === 3 ?
                <RequestedItemsByEmployees clients={RequestedItemsByClients} status={status} />
                : " "
            }

        </Grid>
    }
}

export default withStyles(styles)(ReportContainer)