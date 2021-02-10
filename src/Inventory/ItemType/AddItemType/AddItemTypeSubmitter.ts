import Axios from "axios";


class AddItemTypeSubmitter {

    private form: any;

    constructor(form:any) {
        this.form = form;
    }

    async submit() {
        const {ItemTypeName} = this.form.collecting().data();
        const data: object = {name: ItemTypeName}
        await this.postData(data)
    }

    postData = async (data:object) => {
        try {
            const apiUrl: string = "http://127.0.0.1:3100/api/ItemType/Add";
            const response = await Axios.post(apiUrl,data );
            return response.data
        }catch (e){
            console.log(e)
        }
    };


}

export default AddItemTypeSubmitter