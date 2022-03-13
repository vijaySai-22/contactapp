import React, { useState } from 'react'
import Signin from './components/Signin'
import Signup from './components/Signup'

export default function App() {
  const [hasaccount,setHasaccount] = useState(true)
  return (
    <div>
      {
        (hasaccount)
        ?
        <Signin changeHasAccount={hasaccount=>setHasaccount(hasaccount)} />
        :
        <Signup changeHasAccount={hasaccount=>setHasaccount(hasaccount)} />
      }
    </div>
  )
}
