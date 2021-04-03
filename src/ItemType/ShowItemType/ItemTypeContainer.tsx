import React from "react";
import Axios from "axios";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {AutoCollection, IAutoCollection} from "@autofiy/rac-core";
import {Table} from "@autofiy/rac-material";
import {Button, Grid, TableCell, withStyles} from "@material-ui/core";
import {Link} from "react-router-dom"
import AddIcon from '@material-ui/icons/Add';
import AxiosReceiver from "../../AxiosReceiver";


const styles = (theme: any) => ({
    root: {
        height: "88vh",
    },
    addButtonContainer: {
        padding: "20px"
    },
    formContainer: {
        height: "70vh",
        overflow: "scroll"
    }
})

interface Props {
    classes?: any
}

class ItemTypeContainer extends React.Component<Props> {

    onDelete = async (autoCollection: any, metadata: any, data: any) => {
        if (window.confirm('Are you sure you want to delete this item type')) {
            try {
                await Axios.delete(Endpoints.item_type.delete(data._id));
                const {index} = metadata;
                autoCollection.data().removeAt(index, undefined);
            } catch (e) {
                console.log(e)
            }
        }
    }


    render() {
        const {classes} = this.props
        return <Grid item container  justify="center" alignItems={"center"}>
            <Grid item lg={7} className={classes.addButtonContainer}>
                <Button
                    startIcon={<AddIcon/>}
                    component={Link}
                    to={'./AddItemType'}
                    variant={'contained'}
                >
                    اضافة
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
                                        name: 'الاسم'
                                    },
                                    renderValue: {
                                        actions: (property, data, metadata, autoCollection: IAutoCollection) => {
                                            return <TableCell>
                                                <Button onClick={async () => {
                                                    await this.onDelete(autoCollection, metadata, data)
                                                }}>حذف</Button>
                                                <Button
                                                    component={Link}
                                                    to={{
                                                        pathname: './EditItemType',
                                                        state:
                                                            {
                                                                itemType: data
                                                            }
                                                    }}>تعديل</Button>

                                            </TableCell>
                                        }
                                    }
                                }}
                                services={{
                                    fetcher: (autoCollection: IAutoCollection): any => new AxiosReceiver(autoCollection)
                                }}

                                extra={{
                                    dataSourceOptions: {
                                        url: Endpoints.item_type.get
                                    }
                                }}
                />
            </Grid>

        </Grid>

    }
}


export default withStyles(styles)(ItemTypeContainer)