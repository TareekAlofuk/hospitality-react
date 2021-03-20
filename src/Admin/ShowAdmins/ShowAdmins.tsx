import {Component} from 'react'
import Axios from "axios";
import {Endpoints} from "../../Shared/Endpoints/Endpoints";
import {AutoCollection, IAutoCollection} from "@autofiy/rac-core";
import {Table} from "@autofiy/rac-material";
import {Button, TableCell} from "@material-ui/core";
import {Link} from "react-router-dom";
import AxiosReceiver from "../../AxiosReceiver";

class ShowAdmins extends Component {

    onDelete = async (autoCollection: any, metadata: any, data: any) => {
        if (window.confirm('Are you sure you want to delete this Admin')) {
            try {
                await Axios.delete(Endpoints.admin.delete(data._id));
                const {index} = metadata;
                autoCollection.data().removeAt(index, undefined);
            } catch (e) {
                console.log(e)
            }
        }
    }


    render() {

        return <div style={{width: "40vw"}}>


            <Button
                component={Link}
                to={'./AddAdmin'}
                variant={'contained'}
            >
                ADD
            </Button>

            <AutoCollection as={Table}
                            properties={{
                                orderBy: ['name', 'email', 'actions'],
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
                                                    pathname: './EditAdmin',
                                                    state:
                                                        {
                                                            admin: data
                                                        }
                                                }}>EDIT</Button>

                                        </TableCell>
                                    }

                                }
                            }}
                            extra={{
                                dataSourceOptions: {
                                    url: Endpoints.admin.get
                                }
                            }}

                            services={{
                                fetcher: (autoCollection: IAutoCollection): any => new AxiosReceiver(autoCollection)
                            }}


            /></div>
    }


}

export default ShowAdmins