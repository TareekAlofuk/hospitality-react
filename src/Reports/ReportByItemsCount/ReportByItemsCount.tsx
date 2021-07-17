import React, {Component} from 'react'
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {AutoCollection, IAutoCollection} from "@autofiy/rac-core";
import {Table} from "@autofiy/rac-material";
import {Grid, withStyles} from "@material-ui/core";
import ClientsReportsFetcher from "../ReportByEmployeesName/ClientsReportsFetcher";


const styles = (theme: any) => ({
    root: {
        height: "88vh",
    },
    addButtonContainer: {},
    formContainer: {
        height: "70vh",
        overflow: "scroll"
    }
})

interface Props {
    classes?: any,
    month:number,
    year:number
}

class Reports extends Component<Props> {



    render() {
        const {classes , month} = this.props
        console.log(this.props)

        return <Grid item container justify={"center"} alignItems={'center'} className={classes.root}>



            <Grid item lg={7} className={classes.formContainer}>

                <AutoCollection as={Table}
                                properties={{
                                    orderBy: ['itemName', 'itemCount'],
                                    extraProperties: [
                                        {name: 'actions', title: ' '}
                                    ],
                                    titles: {
                                        itemName: 'اسم العنصر',
                                        itemCount: 'عدد الطلبات',
                                    }
                                }}

                                extra={{
                                    dataSourceOptions: {
                                        url: Endpoints.report.ReportByMonth(month)
                                    }
                                }}

                                services={{
                                    fetcher: (autoCollection: IAutoCollection): any => new ClientsReportsFetcher(autoCollection)
                                }}


                />
            </Grid>
        </Grid>
    }


}

export default withStyles(styles)(Reports)