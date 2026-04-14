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
                  setTimeout(() => {
        localStorage.setItem('token',res.data.token);
        toast.success('Successfully logged in!');
        navigate('/dashboard');
      }, 1000);
            
        }catch(err){
            console.log(err);
            
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <LogIn className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Welcome back</h2>
          <p className="text-slate-500 mt-2">Please enter your details to sign in.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl card-shadow border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Email format</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  name="email"
                  required
                  onChange={e=>setForm({...form,email:e.target.value})}
                  className="input-field pl-10"
                  placeholder="name@gmail.com"
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
                  onChange= {e=>setForm({...form,password:e.target.value})}
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pb-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
