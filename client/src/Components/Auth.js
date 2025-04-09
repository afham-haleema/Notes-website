import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Auth = () => {
  const[username,setusername]=useState('')
  const [password,setPassword]=useState('')
  const [token,setToken]=useState('')
  const [error,setError]=useState('')
  const Navigate=useNavigate()

  const register=async(e)=>{
    e.preventDefault()
    try{
      const {data}=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,{username,password})
      alert(data.message||'Registered successfully')
      setusername('')
      setPassword('')
    }catch(err){
      if(err.response.data.message && err.response && err.response.data){
        setError(err.response.data.message)
      }
      else{
        setError("user already exists")
      }
    }
  }

    const login=async(e)=>{
      e.preventDefault()
      try{
        const {data}=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,{username,password})
        setToken(data.token)
        localStorage.setItem('token',data.token)
        localStorage.setItem('username',data.username || username)
        Navigate('/notes')
      }catch(err){
        if(err.response.data.message && err.response && err.response.data){
          setError(err.response.data.message)
        }
        else{
          setError("Invalid Credentials")
        }
      }
      
    }
  

  return (
    <div className='auth-container'>
      <div className='auth'>
      <form>
        <h1>Authorization Form</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label for='username'>Username</label> <br/>
        <input type='text'id='username' value={username} onChange={(e)=>setusername(e.target.value)} /> <br/>
        <label for='password'>Password</label> <br/>
        <input type='password'id='password'value={password} onChange={(e)=>setPassword(e.target.value)} /> <br/>
        <div className='buttons'>
        <button onClick={login}>Login</button>
        <button onClick={register} >Register</button>
        </div>
        
      </form>
      </div>
    </div>
      
  )
}

export default Auth

