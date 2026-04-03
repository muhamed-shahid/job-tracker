import React from 'react'
import API from "../services/api"
import { useState } from 'react'
import toast from "react-hot-toast"

const Register = () => {

    const [form,setForm] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            await API.post("/auth/register",form)
            toast.success("Registered successfully")
        }catch(err) {
        console.log(err);
        
    }
    } 
  return (
    <form onSubmit={handleSubmit}>
        <input placeholder='Name' onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder='Email' onChange={e=>setForm({...form,email:e.target.value})} />
        <input placeholder='Password' onChange={e=>setForm({...form,password:e.target.value})} />
        <button>Register</button>
    </form>
  )
}

export default Register