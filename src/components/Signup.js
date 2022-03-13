import { createUserWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth'
import { addDoc, collection } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import Home from './Home'

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
                <input type='email' onChange={change} value={email} name='email' required/>
                <h3>Password</h3>
                <input type='password' onChange={change} value={password} name='password' required/>
                <h3>Secret</h3>
                <input type='password' onChange={change} value={secret} name='secret' />
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
