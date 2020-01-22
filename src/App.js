import React, {useState} from 'react';
import './App.css';
import NamePicker from './namePicker'
import { FiSend } from 'react-icons/fi'

function App() {
  const [messages, setMessages] = useState([]);

  console.log(messages);
  return <main>
    <Header />
      <div className='messages'>
        {messages.map((m, i)=>{
          return <div key={i} className='message-container'>
            <div className='bubble'>{m}</div>
            </div>
        })}
      </div>

    <TextArea onSend={text=> {
      setMessages([text, ...messages])
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

function Header() {
  const [name, setName] = useState('')
  return <header>
    <div style={{display:'flex', alignItems:'center'}}>
      <img src='https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png' alt='logo'/>
      <h2> ChatBoi </h2>
    </div>
      <NamePicker onSave={setName}/>
  </header>
}

export default App;