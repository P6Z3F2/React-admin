import React from 'react';
import UserStore from './UserStore';
import './App.css';
import { PieChart } from 'react-minimal-pie-chart';


class Table extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            count: 0,
            img: 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
            current: '',
            username: '',
            ratings: [],
            one: 0,
            two: 0,
            three: 0,
            four: 0,
            five: 0
        };
    }

    HandleClickNO(id, index){
      console.log('mieeeert')
      if (typeof(id) == 'undefined') {
        console.log(id)
      }
      else{
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + UserStore.token },
          body: JSON.stringify({ title: 'React Hooks PUT Request Example' })
      };
        fetch("https://cors-anywhere.herokuapp.com/https://tlab-netcar.herokuapp.com/updateUserValidationNull/" + id, requestOptions)
            .then(response => response.json());
            this.setState({count: Math.random()});
            this.props.validata.splice(index, 1);
      }
      
      UserStore.changed=Math.random();
      }

      HandleClickWatch(id){
        fetch('https://cors-anywhere.herokuapp.com/https://tlab-netcar.herokuapp.com/getUserPicture/' + id, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
           'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + UserStore.token
          }
        })
        .then(res => res.text())
        .then(text => this.setState({img: text})).catch(err => {
          this.setState({img: 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='})
        console.log(err)
          })

          fetch('https://cors-anywhere.herokuapp.com/https://tlab-netcar.herokuapp.com/getUser/' + id, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
           'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + UserStore.token
          }
        })
        .then(res => res.json())
        .then(json => this.Rating(json)).catch(err => {
        console.log(err)
          })

          if(this.state.img===''){
            this.setState({img: 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='})
          }
          this.setState({count: Math.random()});
        }

        Rating(json){
          this.setState({username: json.username, ratings: json.ratings})
            this.setState({one: 0})
              this.setState({two: 0})
              this.setState({three: 0})
              this.setState({four: 0})
              this.setState({five: 0})
          for(var i = 0; i< this.state.ratings.length; i++){
            if(this.state.ratings[i]===1){
              this.setState({one: this.state.one+1})
            }
            if(this.state.ratings[i]===2){
              this.setState({two: this.state.two+1})
            }
            if(this.state.ratings[i]===3){
              this.setState({three: this.state.three+1})
            }
            if(this.state.ratings[i]===4){
              this.setState({four: this.state.four+1})
            }
            if(this.state.ratings[i]===5){
              this.setState({five: this.state.five+1})
            }
          }
        }

    HandleClickCheck(id, index, x){
        if (typeof(id) == 'undefined') {
          console.log(id)
        }
        else{
          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + UserStore.token },
            body: JSON.stringify({ title: 'React Hooks PUT Request Example' })
        };
          fetch("https://cors-anywhere.herokuapp.com/https://tlab-netcar.herokuapp.com/updateUserValidation/" + id, requestOptions)
              .then(response => response.json());
              this.setState({count: Math.random()});
              if(x===1){
                this.props.data.splice(index, 1);
              }else{
                this.props.blocked.splice(index, 1);
              }
              UserStore.changed=Math.random()+1;
        }
        }

        HandleClickX(id, index){
            if (typeof(id) == 'undefined') {
              console.log(id)
            }
            else{
              const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + UserStore.token },
                body: JSON.stringify({ title: 'React Hooks PUT Request Example' })
            };
              fetch("https://cors-anywhere.herokuapp.com/https://tlab-netcar.herokuapp.com/updateUserValidationNull/" + id, requestOptions)
                  .then(response => response.json());
                  this.setState({count: Math.random()});
                  this.props.data.splice(index, 1);
                  UserStore.changed=Math.random();
            }
            }

    render(){
      if(this.props.value===1){
        return(
          <div className="container-fluid">
          <div className="invalid_table row">
            <div className="col-lg-6 col-12">
            <h1>Elfogadásra várnak:</h1>
            <table key={this.state.count} id="dtBasicExample" className="table" width="100%">
                  <thead>
                    <tr>
                      <th className="th-sm">ID
                      </th>
                      <th className="th-sm">Felhasználóév
                      </th>
                      <th className="th-sm">Kreditek
                      </th>
                      <th className="th-sm">Acception
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                      {this.props.data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{item.id} </td>
                                <td>{item.username} </td>
                                <td>{item.credits} Ft</td>
                                <td><img alt="yolo8" className="pointer" src="/images/x.png" width="30" height="30" onClick={() => this.HandleClickX(item.id, index)}></img>
                                <img alt="yol4" className="pointer" src="/images/check.png" width="30" height="30" onClick={() => this.HandleClickCheck(item.id, index, 1)}></img></td>
                            </tr>
                          ))
                        }
                    </tbody>
                  </table></div>
                  <div className="col-lg-6 col-12">
                            <h1>Nem sofőrök:</h1>
                            <table key={this.state.count} id="dtBasicExample" className="table" width="100%">
                  <thead>
                    <tr>
                      <th className="th-sm">ID
                      </th>
                      <th className="th-sm">Felhasználóév
                      </th>
                      <th className="th-sm">Kreditek
                      </th>
                      <th className="th-sm"> 
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                      {this.props.blocked.map((item, index) => (
                            <tr key={item.id}>
                                <td>{item.id} </td>
                                <td>{item.username} </td>
                                <td>{item.credits} Ft</td>
                                <td>
                                <img alt="yol5" className="pointer" src="/images/check.png" width="30" height="30" onClick={() => this.HandleClickCheck(item.id, index, 0)}></img></td>
                            </tr>
                          ))
                        }
                    </tbody>
                  </table>
                            </div>
                              </div></div>
        );
      }else if(this.props.value===2){
        return(
          <div className="container-fluid">
          <div className="row justify-content-center">
              <div className="col-lg-6 col-12">
                <h1 className="my-5">Felhasználók:</h1>
              <table key={this.state.count} id="dtBasicExample2" className="table" >
    <thead>
      <tr>
        <th className="th-sm">ID
        </th>
        <th className="th-sm">Felhasználóév
        </th>
        <th className="th-sm">Kreditek
        </th>
        <th className="th-sm">Kreditek
        </th>
      </tr>
    </thead>
    <tbody>
        {this.props.validata.map((item, index) => (
              <tr key={item.id}>
                  <td>{item.id} </td>
                  <td>{item.username} </td>
                  <td>{item.credits} </td>
                  <td className="text-center"><img  alt="yolo6" className="pointer" src="/images/block.png" width="30" height="30" onClick={() => this.HandleClickNO(item.id, index)}></img>
                  <img alt="yolo9" className=" pointer mx-4" src="/images/eye.png" width="30" height="30" onClick={() => this.HandleClickWatch(item.id)}></img></td>
              </tr>
            ))
          }
      </tbody>
    </table></div><div className="col-lg-3 col-12 text-center"  >
      <img alt="yolo7" className="my-5 kepecske" src={"data:image/png;base64, " + this.state.img}></img>
      <h1>{this.state.username}</h1></div>
      <div className="col-lg-3 col-12 text-center">
        <h1 className="mt-4">Ratings: {this.state.ratings.length}</h1>
                  <PieChart
                  data={[
                      { title: 'One', value: this.state.one, color: '#eb0707' },
                      { title: 'Two', value: this.state.two, color: '#ebdc07' },
                      { title: 'Three', value: this.state.three, color: '#e007eb' },
                      { title: 'Four', value: this.state.four, color: '#07baeb' },
                      { title: 'Five', value: this.state.five, color: '#07eb71' },
                  ]} radius={25}></PieChart></div>
                  </div></div>
          );
      }else{
        return(
          <div><h1>Nincs table</h1></div>);
      }
       
    }

}

export default Table;