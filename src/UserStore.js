import { extendObservable } from 'mobx';


 class UserStore{
     constructor(){

        extendObservable(this, {
            username: '',
            loading: true,
            isLoggedIn: false,
            token: '',
            id: '',
            data: undefined,
            validata: undefined,
            picurl: '',
            blockdata: undefined,
            changed: 1

        })

     }
 }

 export default new UserStore();