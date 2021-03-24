import React, {Component} from 'react'
import Axios from "axios";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {AutoCollection, IAutoCollection} from "@autofiy/rac-core";
import {Table} from "@autofiy/rac-material";
import {Button, Grid, TableCell} from "@material-ui/core";
import {Link} from "react-router-dom";
import AxiosReceiver from "../../AxiosReceiver";
import {withStyles} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";


const styles = (theme: any) => ({
    root: {
        height: "88vh",
    },
    addButtonContainer: {
        height: "10vh",
    },
    formContainer: {
        height: "78vh",
        overflow: "scroll"
    }
})

interface Props {
    classes?: any
}

class ShowItem extends Component<Props> {

    onDelete = async (autoCollection: any, metadata: any, data: any) => {
        if (window.confirm('Are you sure you want to delete this Item')) {
            try {
                await Axios.delete(Endpoints.item.delete(data._id));
                const {index} = metadata;
                autoCollection.data().removeAt(index, undefined);
            } catch (e) {
                console.log(e)
            }
        }
    }

    render() {
        const {classes} = this.props

        return <Grid container justify={"center"} className={classes.root}>

            <Grid item lg={7} className={classes.addButtonContainer}>
                <Button
                    startIcon={<AddIcon />}
                    component={Link}
                    to={'./AddItem'}
                    variant={'contained'}
                >
                    اضافة مادة
                </Button>
            </Grid>

            <Grid item lg={7} className={classes.formContainer}>

                <AutoCollection as={Table}

                                properties={{
                                    orderBy: ['itemName', 'type', 'image', 'actions'],
                                    extraProperties: [
                                        {name: 'actions', title: ''}
                                    ],

                                    titles: {
                                        itemName: 'الاسم',
                                        image: 'الصورة',
                                        type: 'النوع'
                                    },

                                    renderValue: {
                                        actions: (property, data, metadata, autoCollection: IAutoCollection) => {
                                            return <TableCell>

                                                <Button
                                                    component={Link}
                                                    to={{
                                                        pathname: './EditItem',
                                                        state:
                                                            {
                                                                item: data
                                                            }
                                                    }}>تعديل</Button>

                                                <Button onClick={async () => {
                                                    await this.onDelete(autoCollection, metadata, data)
                                                }}>حذف</Button>

                                            </TableCell>
                                        },

                                        image: (p, data) => <img style={{width: 96}} src={data.image}
                                                                 alt={data.itemName}/>
                                    }


                                }}
                                services={{
                                    fetcher: (autoCollection: IAutoCollection): any => new AxiosReceiver(autoCollection)
                                }}
                                extra={{
                                    dataSourceOptions: {
                                        url: Endpoints.item.get
                                    }
                                }}
                /></Grid>
        </Grid>
    }


}

export default withStyles(styles)(ShowItem)