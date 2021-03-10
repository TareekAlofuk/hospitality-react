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
        console.log(data)
        localStorage.setItem("clientName" , data.clientName)
        localStorage.setItem("roomName" , data.roomName)
         localStorage.setItem("userId" ,uuid())
        this.redirectCallback()
    }


}

export default LoginAsClientSubmitter
