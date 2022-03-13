import { createUserWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth'
import { addDoc, collection } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import Home from './Home'
import './../signin.css'

function Signup(props) {
    const[data,setData]=useState({
        email:'',
        password:'',
        secret:'',
    })
    const {email,password,secret}=data
    const change=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    async function signup(){
        await createUserWithEmailAndPassword(auth,email,password)
        .then(user=>console.log(user))
        try {
            const docRef = await addDoc(collection(db, "users"), {
              email: email,
              password: password,
              secretKey: secret
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    const [userIn,setUserIn] = useState(false)
    useEffect(()=>{
        function fetched(){
            const check=onAuthStateChanged(auth,(user)=>{
                if (user!=null){
                    setUserIn(true)
                }
                else{
                    setUserIn(false)
                }
            })
            return check
        }
        fetched()
    },[])
  return (
    <>
        {
            (!userIn)
            ?
            <div style={container}>
                <h1 style={head}>Signup</h1>
                <p style={head}>Already have an account <span style={span} onClick={()=>props.changeHasAccount(true)}>Login</span></p>
                <h3>Email</h3>
                <input style={input} type='email' onChange={change} value={email} name='email' required/>
                <h3>Password</h3>
                <input style={input} type='password' onChange={change} value={password} name='password' required/>
                <h3>Secret</h3>
                <input style={input} type='password' onChange={change} value={secret} name='secret' />
                <br/>
                <br/>
                <div style={btn} onClick={signup} >Sign Up</div>
                <p style={{width:'300px',paddingLeft:'10px'}}>By clicking 'Sign Up' button, you are creating an account, and you agree to Terms of Use.</p>
            </div>
            :<Home/>
        }
        
    </>
  )
}
export default Signup;
const container = {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
}
const head={
    textAlign:'center'
}
const span = { color: "rgb(0, 124, 155)" }
const input = { height: "30px", width: "300px", fontSize: "2em" }
const btn = {
    alignItems: "center",
    width: "310px",
    height: "35px",
    color: "white",
    backgroundColor: "rgb(8, 101, 206)",
    fontSize: "1.3em",
    textAlign: "center",
    paddingTop: "6px"
}
  