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
  return (
    <div>
        {name}
        <button onClick={signout}>Signout</button>
    </div>
  )
}
