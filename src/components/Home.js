import { onAuthStateChanged, signOut } from '@firebase/auth'
import { addDoc, collection, getDocs, } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'

export default function Home() {
    const [id,setId] = useState()
    useEffect(()=>{
        const check=onAuthStateChanged(auth, (user) => {
            if(user)
            setId(user.uid)
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
    async function addContact(e){
        e.preventDefault();
        if(contactMail!==''&&contactNumber!==""&&contactMail!==''){
            try {
                const docRef = await addDoc(collection(db, 'contacts'), {
                  cid:id,
                  cname: contactName,
                  cnumber: contactNumber,
                  cmail: contactMail
                });
                console.log("Document written with ID: ", docRef.id);
            }catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        
    }
    const [contactList,setContactList] = useState([])
    const usersContacts=collection(db,'contacts');
    useEffect(()=>{
        const getData=async()=>{
            await getDocs(usersContacts)
            .then((snapshot)=>{
                let contacts = []
                snapshot.docs.forEach((doc)=>{
                    contacts.push({...doc.data(),id:doc.id})
                })
                setContactList(contacts)
            })
            
        }
        getData()
    },[addContact])

  return (
    <div>
        <button onClick={signout}>Signout</button>
        <h1>Contact Form</h1>
        <h2>Add Contacts</h2>
        <h3>Name</h3>
        <input placeholder='Name' name='contactName' value={contactName} onChange={change} required/>
        <h3>Ph.No</h3>
        <input placeholder='Phone no' name='contactNumber' value={contactNumber} onChange={change} required/>
        <h3>Email</h3>
        <input placeholder='Email' name='contactMail' type='email' value={contactMail} onChange={change} required />
        <button onClick={addContact}>Save</button>
        <h1>My Contacts</h1>
        <table>
            <tr>
                <th>Name</th>
                <th>Ph no</th>
                <th>Mail</th>
            </tr>
            {contactList.map((e) => {
                if(e.cid===id)
            return (
                <tr key={e.id}>
                    <td>{e.cname}</td>
                    <td>{e.cnumber}</td>
                    <td>{e.cmail}</td>
                </tr>
            )
            })}
        </table>
    </div>
  )
}
