import { onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { auth } from '../firebase'
import Home from './Home'

function Signin(props) {
    const emailref = useRef()
    const passwordref = useRef()
    const secretref = useRef()
    async function signin(){
        await signInWithEmailAndPassword(auth,emailref.current.value,passwordref.current.value)
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
                <h1>Sign In</h1>
                <p>Don't have an account <span onClick={()=>props.changeHasAccount(false)}>Signup</span></p>
                <h3>Email</h3>
                <input type='email' ref={emailref} required/>
                <h3>Password</h3>
                <input type='password' ref={passwordref} required/>
                <br/>
                <br/>
                <button onClick={signin} >Sign In</button>
            </div>
            :
            <Home/>
        }
        
    </>
  )
}
export default Signin;