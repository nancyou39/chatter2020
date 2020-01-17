import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  return <main>

  <header> 
    <img className="logo"
      src="https://logodix.com/logo/70903.png"
    />
    Chatter 
  </header>

  <TextInput onSend={t=> console.log(t)}/>

  </main>
}



function TextInput(props){
    var [text, setText] = useState('')              // first element is variable, second is a function

    return <div className="text-input">

    <input value ={text} 
      placeholder=""
      onChange={e=> setText(e.target.value)}          //"on" are event listeners that take arguments (?)
    />
    
    <button onClick={()=> {
      props.onSend(text)
      setText('')
      }}>
      SEND
      </button>
  
    </div>
} 

export default App;


