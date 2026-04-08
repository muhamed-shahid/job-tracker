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
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Jobs</h1>
        <div className="grid gap-4">
            {jobs.map((job)=>(
                <div className="p-4 border rounded shadow" key={job._id}>
                    <h2 className="font-bold">{job.company}</h2>
                    <p>{job.position}</p>
                    <p className="text-sm text-gray-500"></p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Dashboard