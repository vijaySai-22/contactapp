import { onAuthStateChanged, signOut } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'

export default function Home() {
    const [name,setName] = useState()
    useEffect(()=>{
        const check=onAuthStateChanged(auth, (user) => {
            if(user)
            setName(user.uid)
        })
        return check
    },[])
    const signout=()=>{
        signOut(auth)
    }

    const[data,setData]=useState({
        contactName:'',
        contactNumber:'',
        contactMail:'',
    })
    const {contactName,contactNumber,contactMail}=data
    const change=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const addContact=(e)=>{
        e.preventDefault();
        console.log(data)
    }
  return (
    <div>
        <button onClick={signout}>Signout</button>
        <h1>Contact Form</h1>
        <h2>Add Contacts</h2>
        <h3>Name</h3>
        <input placeholder='Name' name='contactName' value={contactName} onChange={change} />
        <h3>Ph.No</h3>
        <input placeholder='Phone no' name='contactNumber' value={contactNumber} onChange={change} />
        <h3>Email</h3>
        <input placeholder='Email' name='contactMail' value={contactMail} onChange={change} />
        <button onClick={addContact}>Save</button>
        <h1>My Contacts</h1>

    </div>
  )
}
