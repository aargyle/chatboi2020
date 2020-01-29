// CSS
import './App.css';
import './media.css';

// Components
import React, {useState, useEffect} from 'react';
import Div100vh from 'react-div-100vh';
import Camera from 'react-snap-pic';
import {BrowserRouter, Route} from 'react-router-dom';
import NamePicker from './namePicker';

// Icons
import { FiSend, FiCamera } from 'react-icons/fi';

// Firebase
import {db, useDB} from './db';
import 'firebase/storage';
import * as firebase from "firebase/app";

// main app
function App() {
  useEffect(()=>{
    const {pathname} = window.location
    if(pathname.length<2) window.location.pathname='home'
  }, [])

  return <BrowserRouter>
    <Route path='/:room' component={Room}/>
  </BrowserRouter>
}

function Room(props) {
  const {room} = props.match.params
  const [name, setName] = useState('')
  const [showCamera, setShowCamera] = useState(false)
  const messages = useDB(room)

  async function takePicture(img) {
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7)
    var storageRef = firebase.storage().ref()
    var ref = storageRef.child(imgID + '.jpg')
    await ref.putString(img, 'data_url')
    db.send({ img: imgID, name, ts: new Date(), room })
  }

  console.log(messages);
  return <Div100vh>
    {showCamera && <Camera takePicture={takePicture} />}

    <Header setName={setName} />
    
    <div className='messages'>
      {messages.map((m, i)=> <Message key={i} m={m} name={name} />)}
    </div>

    <TextArea 
      showCamera={()=>setShowCamera(true)}
      onSend={(text)=> {
        db.send({
          text, name, ts: new Date(), room
        })
      }} 
    />
  </Div100vh>
}

const bucket = 'https://firebasestorage.googleapis.com/v0/b/chatboi2020.appspot.com/o/'
const suffix = '.jpg?alt=media'

function Message({m, name}) {
  return <div className='message-container'>
    <div className='message-name'>{m.name ? m.name : 'Anonymous'}</div>
    <div className='bubble' from={m.name===name?'me':'you'}>{m.text}
      {m.img && <img src={bucket+m.img+suffix} alt='pic'/>}
    </div>
  </div>
}

function TextArea(props) {
  const [text, setText] = useState('');

  return <div className='text-box'>
  <button className='camera' onClick={props.showCamera}>
    <FiCamera style={{height:24, width:24}} />
  </button>

  <input value={text} 
    placeholder='Write your message'
    onChange={e=> setText(e.target.value)}
  />
  <button onClick={() => {
    if(text) {
      props.onSend(text);
    }
    setText('');
  }} disabled={!text}>
  <FiSend className='send-icon'/>
  </button>
  </div>
}

function Header(props) {
  return <header>
    <div style={{display:'flex', alignItems:'center'}}>
      <img src='https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png' alt='logo'/>
      <h2> ChatBoi </h2>
    </div>
      <h2><NamePicker onSave={props.setName}/></h2>
  </header>
}

export default App;