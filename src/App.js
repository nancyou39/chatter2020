import React, {useState} from 'react'
import logo from './logo.svg'
import './App.css'
import NamePicker from './namePicker'


function App() {
  const[messages, setMessages] = useState([]) //messages = state variable; setMessages = function used to change state variable
  console.log(messages) //console.log(messages) used to check what's in the array messages
  return <main>


  <header> 
    <div className="logo-wrap">
    <img className="logo"
      src="https://logodix.com/logo/70903.png"
    />
    Chatter 
    </div>
    <NamePicker onSave={name=>{}}/>
  </header>
  
  <div className="messages"> 
    {messages.map((m,i)=>{ //function called map for every array; map lets you loop through arrays
      return <div key={i} className="message-wrap">
        <div className="message">{m}</div> 
      </div>
      //map is a function that takes a function as an argument; always expects a return 
      //function written as a fat arrow (m)=> *why use m?*
      //we want to display our messages, so we have to return some HMTL
      //for every single message, we will return a div, and for every div we print a message
      //return -> back to HTML
      // have to add i and key={i} so knows which one to delete
      //<div className="messages" holds all our messages and lets us scroll through them
    })} 
  </div>
  

  <TextInput onSend={(text)=> { //blue } always switching between javascript and HTML
    setMessages([text, ...messages]) //setMessages adds something into the messages array above
// when calling a function like setMessages, always use () 
//... is called the spread; takes all the items in existing array 
//using the [] to replace old array with new array
//put text at beginning of the array so new things at the beginning of array

  }} />

</main>
}


function TextInput(props){
    var [text, setText] = useState('')              // first element is variable, second is a function

    return <div className="text-input-wrap">
    <input 
      value ={text} 
      className="text-input"
      placeholder="write your message"
      onChange={e=> setText(e.target.value)}          //"on" are event listeners that take arguments (?)
    />
    
    <button onClick={()=> {
      if(text) props.onSend(text) //will only send if there's text
      setText('')
    }} className="button"
      disabled={!text}>
      SEND
    </button>
  </div>
} 


export default App;

