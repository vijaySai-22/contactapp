import { onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { auth } from '../firebase'
import Home from './Home'
import './../App.css'
function Signin(props) {
    const emailref = useRef()
    const passwordref = useRef()
    async function signin(){
        try{
            await signInWithEmailAndPassword(auth,emailref.current.value,passwordref.current.value)
        .then(user=>console.log(user))
        }catch{
            alert("Invalid Details")
        }
        emailref.current.value=''
        passwordref.current.value=''
    }
    const [userIn,setUserIn] = useState(false)
    useEffect(()=>{
        const check=onAuthStateChanged(auth,(user)=>{
            if (user!=null){
                setUserIn(true)
            }
            else{
                setUserIn(false)
            }
        })
        return check
    },[])
  return (
    <>  
        {
            (!userIn)
            ?
            <div style={container}>
                <h1 style={head}>Sign In</h1>
                <p style={head}>Don't have an account <span style={span} onClick={()=>props.changeHasAccount(false)}>Signup</span></p>
                <h3>Email</h3>
                <input placeholder="Enter MailId" style={input} type='email' ref={emailref} required/>
                <h3>Password</h3>
                <input placeholder="Enter Password" style={input} type='password' ref={passwordref} required/>
                <br/>
                <p style={fgt}>Forgot your password?</p>
                <div style={btn} onClick={signin} >Sign In</div>
            </div>
            :
            <Home/>
        }
        
    </>
  )
}
export default Signin;

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
const input = { height: "30px", width: "300px", fontSize: "1.3em" }
const fgt = { textAlign: "end", color: "rgb(0, 124, 155)" }
const btn = {
    alignItems: "center",
    width: "300px",
    height: "35px",
    color: "white",
    backgroundColor: "rgb(8, 101, 206)",
    fontSize: "1.3em",
    textAlign: "center",
    paddingTop: "6px"
}
  