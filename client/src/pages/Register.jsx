import React, { use } from 'react'
import API from "../services/api"
import { useState } from 'react'
import toast from "react-hot-toast"
import { User, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const [form,setForm] = useState({
        name:"",
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const[isLoading,setIsLoading] = useState(false)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setIsLoading(true)
        try{
            await API.post("/auth/register",form)
            setTimeout(()=>{             
            toast.success("Registered successfully")
            navigate("/login")
            setIsLoading(false)
            },1000)
        }catch(err) {
        console.log(err);
        toast.error("Something went wrong")
        setIsLoading(false)
        
    }
    } 
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <UserPlus className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Create an account</h2>
          <p className="text-slate-500 mt-2">Start tracking your job applications today.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl card-shadow border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  name="name"
                  required
                  onChange={e=>setForm({...form,name:e.target.value})}
                  className="input-field pl-10"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  name="email"
                  required
                  onChange={e=>setForm({...form,email:e.target.value})}
                  className="input-field pl-10"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  name="password"
                  required
                  onChange={e=>setForm({...form,password:e.target.value})}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register