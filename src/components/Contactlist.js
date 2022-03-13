import { collection, getDocs, query, where } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

export default function Contactlist() {
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
    },[])
  return (
    <div>
        <table>
            <tr>
                <th>Name</th>
                <th>Ph no</th>
                <th>Mail</th>
            </tr>
            {contactList.map((e) => {
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
