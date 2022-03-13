import { createUserWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { auth } from '../firebase'
import Home from './Home'

function Signup(props) {
    const emailref = useRef()
    const passwordref = useRef()
    const secretref = useRef()
    async function signup(){
        await createUserWithEmailAndPassword(auth,emailref.current.value,passwordref.current.value)
        .then(user=>console.log(user))
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
            <div>
                <h1>Signup</h1>
                <p>Already have an account <span onClick={()=>props.changeHasAccount(true)}>Login</span></p>
                <h3>Email</h3>
                <input type='email' ref={emailref} required/>
                <h3>Password</h3>
                <input type='password' ref={passwordref} required/>
                <h3>Secret</h3>
                <input type='password' ref={secretref}/>
                <br/>
                <br/>
                <button onClick={signup} >Sign Up</button>
            </div>
            :<Home/>
        }
        
    </>
  )
}
export default Signup;
