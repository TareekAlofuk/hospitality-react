import axios from "axios";


class AxiosSubmitter {

    form:any
    method:any
    url:any
    success:any
    error:any

    constructor(form:any , url:any ,method?:any ,  success?:(data?:any) =>void, error?:(reqData?:any , error?:any) =>void)  {
        this.form = form;
        this.url = url ;
        method?this.method = method:this.method = 'POST' ;
        success? this.success = success:this.success=()=>{};
        error? this.error = error:this.error=()=>{};
    }

    getForm() {
        return this.form;
    }


   async submit() {
       const reqData = this.getForm().collecting().data();
       try {
            const data:any = await axios({
                method: this.method,
                url: this.url,
                data:reqData
            });
            this.success(data.data)
        }catch (error){
            this.error(reqData , error)
            console.log(error)
        }
    }


}

export default AxiosSubmitter
