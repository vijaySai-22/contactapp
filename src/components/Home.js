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
    <div style={container}>
        <button style={btn} onClick={signout}>Signout</button>
        <h1>Contact Form and Contact List Page</h1>
        <h2>Add Contacts</h2>
        <h3>Name</h3>
        <input style={input} placeholder='Name' name='contactName' value={contactName} onChange={change} required/>
        <h3>Ph.No</h3>
        <input style={input} placeholder='Phone no' name='contactNumber' value={contactNumber} onChange={change} required/>
        <h3>Email</h3>
        <input style={input} placeholder='Email' name='contactMail' type='email' value={contactMail} onChange={change} required /><br/><br/>
        <button style={btn2} onClick={addContact}>Save</button>
        <h1>My Contacts</h1>
        <table style={tablestyle} width='700px'>
            <tr style={tablestyle}>
                <th style={thstyle}>Name</th>
                <th style={thstyle}>Ph no</th>
                <th style={thstyle}>Mail</th>
            </tr>
            <tr>
                <td style={tablestyle}>SampleName1</td>
                <td style={tablestyle}>9008887766</td>
                <td style={tablestyle}>sample1@gmail.com</td>
            </tr>
            <tr>
                <td style={tablestyle}>SampleName2</td>
                <td style={tablestyle}>6655882299</td>
                <td style={tablestyle}>sample2@gmail.com</td>
            </tr>
            {contactList.map((e) => {
                if(e.cid===id)
            return (
                <tr style={tablestyle} key={e.id}>
                    <td style={tablestyle}>{e.cname}</td>
                    <td style={tablestyle}>{e.cnumber}</td>
                    <td style={tablestyle}>{e.cmail}</td>
                </tr>
            )
            })}
        </table>
    </div>
  )
}
const tablestyle = { 
    border: "1px solid black", 
    borderCollapse: "collapse", 
    padding: "15px",
    alignItems:'center'
}
const thstyle = {
    border: "1px solid black",
    borderCollapse: "collapse",
    backgroundColor: "grey",
    color: "white",
    padding: "15px"
}
const btn = {
    alignItems: "center",
    width: "80px",
    height: "30px",
    color: "white",
    backgroundColor: "red",
    textAlign: "center",
    paddingTop: "1px"
}
const btn2 = {
    alignItems: "center",
    width: "80px",
    height: "30px",
    color: "white",
    backgroundColor: "rgb(8, 101, 206)",
    textAlign: "center",
    paddingTop: "1px"
}
const input = { height: "30px", width: "300px", fontSize: "1.3em" }
const container={
    textAlign:'center',
}