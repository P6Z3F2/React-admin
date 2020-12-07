import React, {useContext} from 'react';
import UserStore from './UserStore';
import {UserContext} from './UserContext';
import { PieChart } from 'react-minimal-pie-chart';


class Tabletrue extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            count: 0
        };
    }

        HandleClickNO(id, index){
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
            }
            }

    render(){
        return(
        <div className="row justify-content-center">
            <div className="col">
            <table key={this.state.count} id="dtBasicExample" className="table" >
  <thead>
    <tr>
      <th className="th-sm">ID
      </th>
      <th className="th-sm">Felhasználóév
      </th>
      <th className="th-sm">Kreditek
      </th>
    </tr>
  </thead>
  <tbody>
      {this.props.data.map((item, index) => (
            <tr key={item.id}>
                <td>{item.id} </td>
                <td>{item.username} </td>
                <td>{item.credits} </td>
                <td><img src="/images/block.png" width="30" height="20" onClick={() => this.HandleClickNO(item.id, index)}></img></td>
            </tr>
          ))
        }
    </tbody>
  </table></div><div className="col" style={{backgroundColor: '#e007eb'}}>
                <PieChart className="kordiagram"
                data={[
                    { title: 'One', value: 2, color: '#eb0707' },
                    { title: 'Two', value: 4, color: '#ebdc07' },
                    { title: 'Three', value: 10, color: '#e007eb' },
                    { title: 'Four', value: 8, color: '#07baeb' },
                    { title: 'Five', value: 20, color: '#07eb71' },
                ]} radius={10} paddingAngle={0}></PieChart>
                </div></div>
        );
    }

}

export default Tabletrue;