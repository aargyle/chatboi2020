import React, {useState} from 'react';
import './App.css';

function App() {
  return <main>
    <Header />
    <div className='bubble'>whattup!</div>
    <TextArea onSend={t=> console.log(t)} />
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
    props.onSend(text);
    setText('');
  }}>
  Send
  </button>
  </div>
}

function Header() {
  return <header>
    <img src='https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png'/>
    <h2> ChatBoi </h2>
  </header>
}

export default App;
