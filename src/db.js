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
        .where('room','==',room)
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
    apiKey: "AIzaSyBWsWU3I1u4RSFHLMgCGEY_EZjW0GPWMmA",
    authDomain: "chatboi2020.firebaseapp.com",
    databaseURL: "https://chatboi2020.firebaseio.com",
    projectId: "chatboi2020",
    storageBucket: "chatboi2020.appspot.com",
    messagingSenderId: "1018711220948",
    appId: "1:1018711220948:web:d13b45e3c2c7f95365d141"
}

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()