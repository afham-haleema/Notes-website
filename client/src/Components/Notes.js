import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Notes = () => {
    const Navigate=useNavigate()
    const [notes,setNotes]=useState([])
    const [title,setTitle]=useState('')
    const [body,setBody]=useState('')
    const [error,setError]=useState('')
    const token=localStorage.getItem('token')
    const [search,setSearch]=useState('')
    const username=localStorage.getItem('username')

    useEffect(()=>{
        const fetchNotes=async()=>{
            if(!token){
                console.log('No Token found')
                return;
            }
            try{
                const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes`,{
                    headers:{Authorization: `Bearer ${token}`}
                })
                setNotes(data)
            }catch(err){
                console.log(err)
                setError(err)
            }
        }
        fetchNotes();

    },[token])
    

    const addNotes=async(e)=>{
        e.preventDefault()
        const {data}=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notes`,{title,body},{
            headers:{Authorization:`Bearer ${token}`}
        })
        setNotes([...notes,data])
        setBody('')
        setTitle('')
    }

    const logout=()=>{
        localStorage.removeItem('token')
        Navigate('/')
    }

    const handleDelete=async(noteid)=>{
        try{
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${noteid}`,{
                headers:{Authorization: `Bearer ${token}`}
            })
            setNotes(notes.filter(note=>note._id!==noteid))
        }catch(err){
            console.log(err)
            setError(err)
        }
    }

    const handleDetails=async(noteid)=>{
        Navigate(`/details/${noteid}`)
    }
    
    const filteredNotes=notes.filter(note=>
        note.title.toLowerCase().includes(search.toLowerCase())||note.body.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className='notes'>
        <div className='navbar'>
        <button onClick={logout} id='logout'>Logout</button>
        <h2>Hello, {username}</h2>
        </div>
       <div className='add-note'>
       <form>
        <h1>Add New Note</h1>
        <label for='title'>Title</label> <br/>
        <input type='text'id='title' value={title} onChange={(e)=>setTitle(e.target.value)} /> <br/>
        <label for='body'>body</label> <br/>
        <textarea id='body'value={body} onChange={(e)=>setBody(e.target.value)} /> <br/>
        <button onClick={addNotes}>Add</button>
      </form>
       </div>

       <h1 style={{textAlign:"center", marginTop:"2rem"}}>Notes</h1>
       <div className='search-container'>
        <div className='empty'></div>
        <input type='text' value={search} onChange={(e)=>setSearch(e.target.value)} id='search' placeholder='Search Notes...'/>
       </div>
       <div className='notes-container'>
       {filteredNotes.map((note=>(
        <div className='note-card' key={note._id} onClick={()=>handleDetails(note._id)}>
            <h3 style={{textAlign:"center"}}>{note.title}</h3>
            <button onClick={(e)=>{e.stopPropagation(); handleDelete(note._id)}}>Delete</button>
            <hr/>
            <p>{note.body.length>220 ? `${note.body.slice(0,220)}...`:note.body}</p>
        </div>
       )))}
       </div>
       
    </div>
  )
}

export default Notes
