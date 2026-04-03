import React from 'react'
import { useEffect } from 'react'
import API from '../services/api'

const Dashboard = () => {

    useEffect(()=>{
        const fetchJobs = async ()=>{
            try{
                const res = await API.get("/jobs")
                console.log(res.data);
                 
            }catch(err){
                console.log(err);
                
            }
        }
        fetchJobs()
    },[])
  return (
    <h1>Dashboard</h1>
  )
}

export default Dashboard