import React from 'react';
import UserStore from './UserStore';
import LoginForm from './LoginForm';
import './App.css';
import './profil.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import './awesome.js';
import Data from './data'
import { observer } from 'mobx-react';


class App extends React.Component{

    constructor(){
        super();
        this.state = {
            value: '',
            id: ''
        };

        this.loginclick = this.loginclick.bind(this)
    }

    async componentDidMount(){

        try{
            
        }
        catch(e){
            console.log(e)
        }

    }

    changeValue(value){
        this.setState({value});
    }

    changeId(id){
        this.setState({id});
    }

    loginclick(){
        UserStore.isLoggedIn=true;
        console.log(this.state.value);
        console.log(this.state.id);
        console.log(UserStore.loading);
    }

    render(){

        if(!UserStore.isLoggedIn){
            return(
                <LoginForm changeValue={this.changeValue.bind(this)} changeId={this.changeId.bind(this)}/>
            );
        }else{
            return (
                    <Data/>
            );
        }
    }
}

export default observer(App);