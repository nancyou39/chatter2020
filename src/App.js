import React, {useState, useEffect} from 'react'
import './App.css'
import './media.css'
import {db, useDB} from './db.js'
import NamePicker from './namePicker'
import { BrowserRouter, Route } from 'react-router-dom'
import Camera from 'react-snap-pic'
import {FiCamera} from 'react-icons/fi'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"
import Div100vh from 'react-div-100vh'

function App(){
  useEffect(()=>{
    const {pathname} = window.location
    if(pathname.length<2) window.location.pathname='home'
  }, [])
  return <BrowserRouter>
    <Route path="/:room" component={Room}/>
  </BrowserRouter>
}

function Room(props) {
  const {room} = props.match.params
  const [name, setName] = useState('')
  const [showCamera, setShowCamera] = useState(false)
  const messages = useDB(room)

  async function takePicture(img) { //async waits for line of code to be done before running next line
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7)
    var storageRef = firebase.storage().ref()
    var ref = storageRef.child(imgID + '.jpg')
    await ref.putString(img, 'data_url')
    db.send({ img: imgID, name, ts: new Date(), room })
  }

  return <Div100vh>

    {showCamera && <Camera takePicture={takePicture} />}

    <header>
      <div className="logo-wrap">
        <img className="logo"
          alt="logo"
          src="https://logodix.com/logo/70903.png" 
        />
        Chatter
      </div>
      <NamePicker onSave={setName} />
    </header>

    <div className="messages">
      {messages.map((m,i)=> <Message key={i} m={m} name={name}/>)}
    </div>

    <TextInput sendMessage={text=> props.onSend(text)} 
      showCamera={()=>setShowCamera(true)}
      onSend={(text)=> {
        db.send({
          text, name, ts: new Date(), room
        })
        }} 
    />
    
  </Div100vh>
}


function Message({m, name}){
  return <div className="message-wrap"
    from={m.name===name?'me':'you'}
    onClick={()=>console.log(m)}>
    <div className="message">
      <div className="msg-name">{m.name}</div>
      <div className="msg-text">{m.text}
      {m.img && <img src={bucket + m.img + suffix} alt="pic"/>}
    </div>
    </div>
  </div>
}

const bucket = 'https://firebasestorage.googleapis.com/v0/b/nancyou39-95043.appspot.com/o/'
const suffix = '.jpg?alt=media'

function TextInput(props){
  var [text, setText] = useState('') 
  return <div className="text-input-wrap">

    <button onClick={props.showCamera}
      style={{position:'absolute', left:6, right:10}}> 
      <FiCamera style={{height:35, width:15}} />
    </button>
    <input 
      value={text} 
      className="text-input"
      placeholder="write your message"
      onChange={e=> setText(e.target.value)}
      onKeyPress={e=> {
        if(e.key==='Enter') {
          if(text) props.onSend(text)
          setText('')
        }
      }}
    />

    <button onClick={()=> {
      if(text) props.onSend(text)
      setText('')
    }} className="button"
      disabled={!text}>
      SEND
    </button>
  </div>
}

export default App

/*
import { BrowserRouter, Route } from "react-router-dom";
function App() {
  useEffect(()=>{
    const {pathname} = window.location
    if(pathname.length<2){
      window.location.pathname = Math.random().toString(36).slice(7)
    }
  },[])
  return (<BrowserRouter>
    <Route path="/:room" component={Content} />
  </BrowserRouter>)
}
*/




//const {room} = props.match.params