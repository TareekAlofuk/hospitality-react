import React from "react";
import Axios from "axios";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {AutoCollection, IAutoCollection} from "@autofiy/rac-core";
import {Table} from "@autofiy/rac-material";
import {Button, Grid, TableCell, withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import AxiosReceiver from "../../AxiosReceiver";
import AddIcon from "@material-ui/icons/Add";


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

class RoomContainer extends React.Component<Props> {


    onDelete = async (autoCollection: any, metadata: any, data: any) => {
        if (window.confirm('Are you sure you want to delete this Room')) {
            try {
                await Axios.delete(Endpoints.room.delete(data._id));
                const {index} = metadata;
                autoCollection.data().removeAt(index, undefined);
            } catch (e) {
                console.log(e)
            }
        }
    }


    render() {
        const {classes} = this.props
        return <Grid container item justify={"center"} alignItems={"center"} className={classes.root}>
            <Grid item lg={7} className={classes.addButtonContainer}>
                <Button
                    startIcon={<AddIcon/>}
                    component={Link}
                    to={'./AddRoom'}
                    variant={'contained'}
                >
                    اضافة غرفة
                </Button>
            </Grid>
            <Grid item lg={7} className={classes.formContainer}>

                <AutoCollection as={Table}
                                properties={{
                                    orderBy: ['name', 'actions'],
                                    extraProperties: [
                                        {name: 'actions', title: ''}
                                    ],
                                    titles: {
                                        name: 'اسم الغرفة'
                                    },
                                    renderValue: {
                                        actions: (property, data, metadata, autoCollection: IAutoCollection) => {
                                            return <TableCell>

                                                <Button
                                                    component={Link}
                                                    to={{
                                                        pathname: './EditRoom',
                                                        state:
                                                            {
                                                                room: data
                                                            }
                                                    }}>تعديل
                                                </Button>
                                                <Button onClick={async () => {
                                                    await this.onDelete(autoCollection, metadata, data)
                                                }}>حذف
                                                </Button>

                                            </TableCell>
                                        }
                                    }
                                }}
                                services={{
                                    fetcher: (autoCollection: IAutoCollection): any => new AxiosReceiver(autoCollection)
                                }}
                                extra={{
                                    dataSourceOptions: {
                                        url: Endpoints.room.get
                                    }
                                }}
                />
            </Grid>
        </Grid>

    }
}


export default withStyles(styles)(RoomContainer)