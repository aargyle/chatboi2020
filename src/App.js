import React, {useState, useEffect} from 'react';
import './App.css';
import NamePicker from './namePicker'
import { FiSend } from 'react-icons/fi'
import {db, useDB} from './db'
import {BrowserRouter, Route} from 'react-router-dom'

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
  const messages = useDB(room)

  console.log(messages);
  return <main>
    <Header setName={setName} />
    <div className='messages'>
      {messages.map((m, i)=>{
        return <div key={i} className='message-container'>
          <div className='message-name'>{m.name ? m.name : 'Anonymous'}</div>
          <div className='bubble' from={m.name===name?'me':'you'}>{m.text}</div>
        </div>
      })}
    </div>

    <TextArea onSend={text=> {
      db.send({
        text, name, ts: new Date(), room
      })
    }} />
  </main>
}

function TextArea(props) {
  const [text, setText] = useState('');
  
  return <div className='text-box'>
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
      <NamePicker onSave={props.setName}/>
  </header>
}

export default App;