import React, {useContext, useState} from 'react';
import UserStore from './UserStore';
import {Button, Form, FormGroup,} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {UserContext} from './UserContext';
import axios from 'axios';


class LoginForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false,
            tok: '',
            id: ' ',
            value: ''
        };
    }

    static token;

    gettoken(){
        useState({tok: useContext(UserContext)});
        return this.state.tok;
    }

    getid(){
        return this.state.id;
    }

    resetForm(){
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        });
    }

    setPic(json){
        UserStore.picurl=json
    }

    setName(json){
        UserStore.username=json
            }

    async doLogin(){
        //this.setState({
          //  buttonDisabled: true
        //})

        try{
            let res = await fetch('https://tlab-netcar.herokuapp.com/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': this.state.username,
                     'password': this.state.password
                })
            });
            //this.setState({username: 'bernatadmin'})
            UserStore.username=this.state.username;
            let result = await res.json();
            if(res.status !== 200){
                alert('Something went wrong');
            }
            else if(result.message!=='Wrong username or password'){
                console.log(result.message)
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
                

            var array = result.message.split(' ');
            this.state.tok=array[0];
            this.state.id=array[1];
            this.token = array[0];
            UserStore.isLoggedIn=true;
            UserStore.token=array[0];
            UserStore.id=array[1];
            this.props.changeValue(this.state.tok);
            this.props.changeId(this.state.id);
            console.log(array[1]);

            axios.get('https://cors-anywhere.herokuapp.com/https://tlab-netcar.herokuapp.com/getUserPicture/' + this.state.id, {
              headers: {
                'Accept': 'application/json',
               'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + UserStore.token
              }
            })
              .then(res => res.text)
              .then((text) => this.setPic(text)
              ).catch(err => {
                console.log(err)
              })

              fetch('https://cors-anywhere.herokuapp.com/https://tlab-netcar.herokuapp.com/getUsername/' + this.state.id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + UserStore.token
                }
                })
                .then(res => res.text())
                .then(text => this.setName(text)).catch(err => {
                console.log(err)
                })
            }
            else{
                alert(result.message);
            }
        }
        catch(e){
            console.log(e);
            this.resetForm();
        }
      //console.log(UserStore.picurl)
    }

    handleInputChange = (event) => {
        event.preventDefault()
        console.log('username: ' + event.target.value)
        this.setState({username: event.target.value})
    }

    handleInputChangePW = (event) => {
        event.preventDefault()
        console.log('password: ' + event.target.value)
        this.setState({password: event.target.value})
    }

    render(){
        return(
            <div id="asd">
                 <section className="container-fluid bg">
                 <section className="row justify-content-center">
                 <section className="col-12 col-sm-6 col-md-3">
                     <div className = "d-flex justify-content-center">
                         <header className = "Login_header">
                          <Form className= "form-contanier">
                               <div className="d-flex justify-content-center kep">
                                  <img alt="profil" className="kepem" src="images/profile.png"></img>
                                </div>

                                 <FormGroup className="email" controlId="formEmail">
                                  <FontAwesomeIcon className="usericon" icon="user"/>
                                  <Form.Control onChange={this.handleInputChange} type="email" placeholder= "Enter Email">
                        
                                 </Form.Control>
                                 </FormGroup>
                                    <FormGroup className="email" controlId="formPassword">
                                                    <FontAwesomeIcon className="usericon" icon="lock"/>
                                                    <Form.Control onChange={this.handleInputChangePW} type="password" placeholder= "Enter Password"></Form.Control>
                                    </FormGroup>
                                <div className = "d-flex justify-content-center">
                                <Button className="btn-block" variant="secondary" onClick={ () => this.doLogin()}  >Login</Button>
                                </div>
                            </Form>
                         </header>
                    </div>
                </section>
                </section>
                </section>
        </div>
        );
    }

}

export default LoginForm;