import React from "react";
import Axios from "axios";
import {Endpoints} from "../../../Shared/Endpoints/Endpoints";
import {AutoCollection, IAutoCollection} from "@autofiy/rac-core";
import {Table} from "@autofiy/rac-material";
import {Button, Grid, TableCell} from "@material-ui/core";
import {Link} from "react-router-dom"
import AddIcon from '@material-ui/icons/Add';


class ItemTypeContainer extends React.Component {

    state = {data: [], status: 'LOADING'};

    getData = async () => {
        const apiUrl: string = Endpoints.item_type.get
        const response = await Axios.get(apiUrl);
        return response.data
    };
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

    componentDidMount() {
        this.getData().then(data => {
            console.log(data)
            this.setState({data: data, status: 'SUCCESS'})
        }).catch(e => {
            this.setState({data: [], status: 'ERROR'})
        })
    }


    render() {
        return <Grid container spacing={2} justify="center" >

            <Grid item xs={3}>
                <Button
                    startIcon={<AddIcon />}
                    component={Link}
                    to={'./AddItemType'}
                    variant={'contained'}
                >
                    ADD
                </Button>
            </Grid>

            <Grid item xs={10}>
            <AutoCollection as={Table}
                            properties={{
                                orderBy: ['name', 'actions'],
                                extraProperties: [
                                    {name: 'actions', title: 'Actions'}
                                ],
                                renderValue: {
                                    actions: (property, data, metadata, autoCollection: IAutoCollection) => {
                                        return <TableCell>
                                            <Button onClick={async () => {
                                                await this.onDelete(autoCollection, metadata, data)
                                            }}>DELETE</Button>
                                            <Button
                                                component={Link}
                                                to={{
                                                    pathname: './EditItemType',
                                                    state:
                                                        {
                                                            itemType: data
                                                        }
                                                }}>EDIT</Button>

                                        </TableCell>
                                    }
                                }
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


export default ItemTypeContainer