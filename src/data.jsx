import React, {useEffect, useState } from 'react';
import './App.css'
import UserStore from './UserStore'
import Table from './Table'




export default function Data(){
    const [data, setData]=useState([])
    const [validata, setValidata]=useState([])
    const [blockdata, setBlock]=useState([])
    const [button, setButton] = useState(1)
    const [img, setImg] = useState('iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==')

      function handleClick(){
        setButton(1);
      }

      function handleClick2(){
      }

      function handleClick3(){
        setButton(2);
      }

    useEffect(() => {
        console.log('Bearer ' + UserStore.token)
        fetch('https://cors-anywhere.herokuapp.com/https://tlab-netcar.herokuapp.com/getAllInvalidUsers', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
           'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + UserStore.token
          }
        })
          .then(res => res.json())
          .then((json) => setData(json)
          ).catch(err => {
            console.log(err)
          })
      UserStore.data=data

      console.log('Bearer ' + UserStore.token)
        fetch('https://cors-anywhere.herokuapp.com/https://tlab-netcar.herokuapp.com/getAllValidUsers', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
           'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + UserStore.token
          }
        })
          .then(res => res.json())
          .then((json) => setValidata(json)
          ).catch(err => {
            console.log(err)
          })
      UserStore.validata=validata

      console.log('Bearer ' + UserStore.token)
        fetch('https://cors-anywhere.herokuapp.com/https://tlab-netcar.herokuapp.com/getAllValidNull', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
           'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + UserStore.token
          }
        })
          .then(res => res.json())
          .then((json) => setBlock(json)
          ).catch(err => {
            console.log(err)
          })
      UserStore.blockdata=blockdata
      

      fetch('https://cors-anywhere.herokuapp.com/https://tlab-netcar.herokuapp.com/getUserPicture/' + UserStore.id, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
           'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + UserStore.token
          }
        })
        .then(res => res.text())
        .then(text => setImg(text)).catch(err => {
        console.log(err)
          })
      }, [UserStore.changed])

    return(
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <a className="navbar-brand">
      <img alt="yolo" className="kepem" src={"data:image/png;base64, " + img} />{UserStore.username}
  </a>
  <div id="navbarNavAltMarkup">
    <div className="navbar-nav">
      
      <a className="nav-item nav-link mx-4 pointer" onClick={handleClick}><img alt="yolo1" className="ikon" src="/images/img_533234.png"/>Jelentkezések</a>
      <a className="nav-item nav-link mx-4 pointer" onClick={handleClick2} ><img alt="yolo2" className="ikon" src="/images/6420720_preview.png"/>Diagram</a>
      <a className="nav-item nav-link mx-4 pointer" onClick={handleClick3} ><img alt="yolo3" className="ikon" src="/images/33308.png"/>Felhasználók</a>
    </div>
  </div>
    </nav>
    <div  ><Table value={button} blocked={blockdata}  data={data} validata={validata}/></div></div>
    )
}