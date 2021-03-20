import {v4 as uuid} from 'uuid'


class LoginAsClientSubmitter {

    form:any
    redirectCallback:any

    constructor(form:any, redirectCallback:any) {
        this.form = form;
        this.redirectCallback = redirectCallback;
    }

    getForm() {
        return this.form;
    }


    submit() {
        const data = this.getForm().collecting().data();
        localStorage.setItem("clientName" , data.clientName)
        localStorage.setItem("roomName" , data.roomName)
        localStorage.setItem("userId" ,uuid())
        localStorage.setItem("permissions",JSON.stringify({client:true}) )

        this.redirectCallback()
    }


}

export default LoginAsClientSubmitter
