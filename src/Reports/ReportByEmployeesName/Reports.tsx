import React, {Component} from 'react'
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {AutoCollection, IAutoCollection} from "@autofiy/rac-core";
import {Table} from "@autofiy/rac-material";
import {Grid, withStyles} from "@material-ui/core";
import ClientsReportsFetcher from "./ClientsReportsFetcher";


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
    classes?: any
}

class Reports extends Component<Props> {



    render() {
        const {classes} = this.props
        console.log(this.props)

        return <Grid item container justify={"center"} alignItems={'center'} className={classes.root}>



            <Grid item lg={7} className={classes.formContainer}>

                <AutoCollection as={Table}
                                properties={{
                                    orderBy: ['_id', 'ordersCount', 'itemsCount'],
                                    extraProperties: [
                                        {name: 'actions', title: ' '}
                                    ],
                                    titles: {
                                        _id: 'الأسم',
                                        ordersCount: 'عدد الطلبات',
                                        itemsCount:"عدد العناصر في كل الطلبات"
                                    }
                                }}
                                extra={{
                                    dataSourceOptions: {
                                        url: Endpoints.report.AllClientsReport
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