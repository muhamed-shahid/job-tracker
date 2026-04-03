import React from 'react'
import { useState } from 'react'
import API from "../services/api"
import toast from 'react-hot-toast'

export const Login = () => {

    const [form,setForm] = useState({
        email:"",
        password:""
    })
    const handleSubmit = async(e)=>{
        e.preventDefault(e)
        try{
            const res = await API.post("/auth/login", form)
            localStorage.setItem("token",res.data.token)
            toast.success("Login success")
            
        }catch(err){
            console.log(err);
            
        }
    }


  return (
    <form onSubmit={handleSubmit}>
        <input placeholder='Email' onChange={e=>setForm({...form,email:e.target.value})} />
        <input placeholder='Password' onChange={e=>setForm({...form,password:e.target.value})} />
        <button>Login</button>
    </form>
  )
}
