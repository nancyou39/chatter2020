import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])

    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    
    useEffect(() => {
        store.collection(coll)
        // .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }


const firebaseConfig = {
    apiKey: "AIzaSyBtBvy3J2U_LxS7IXXrmiWPXXLJCOmYP5w",
    authDomain: "nancyou39-95043.firebaseapp.com",
    databaseURL: "https://nancyou39-95043.firebaseio.com",
    projectId: "nancyou39-95043",
    storageBucket: "nancyou39-95043.appspot.com",
    messagingSenderId: "508027025744",
    appId: "1:508027025744:web:fb2ad21f74b0da89139455",
    measurementId: "G-QXTDXBDL72"
  };

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()