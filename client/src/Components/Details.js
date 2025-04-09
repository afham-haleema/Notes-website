import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Details = () => {
    const {id}=useParams()
    const [note,setNote]=useState(null)
    const token=localStorage.getItem('token')

    useEffect(()=>{
        const handleNoteDetails=async()=>{
            try{
                const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${id}`,{
                    headers:{Authorization: `Bearer ${token}`}
                })
                setNote(data)
            }catch(err){
                console.log(err)
            }
        }
        handleNoteDetails()
    },[id])

    if (!note) return <p>Loading...</p>;

  return (
    <div className='container'>
        <div className='details'>
        <h1>{note.title}</h1>
        <hr/>
        <p>{note.body}</p>
        </div>
    </div>
  )
}

export default Details
