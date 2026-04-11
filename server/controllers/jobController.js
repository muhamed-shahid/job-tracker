const Job = require("../models/Job")
const job = require("../models/Job")

exports.addJob = async(req,res)=>{
    try{
        const{position,company,location} = req.body

        const job = await Job.create({
            position,
            company,
            location,
            user:req.user.id
        })

        res.status(201).json({
            message:"Job added successfully",
            data:job
        })
    }catch(err){
        res.status(500).json({
            message:"Server error"
        })
    }
}


exports.getJobs = async (req,res)=>{
    try{
        const jobs = await Job.find({user:req.user.id})

        res.status(201).json({
            success:true,
            data:jobs
        })
    }catch(err){
        res.status(500).json({
            message:"Server error"
        })
    }
}




exports.updateJob = async(req,res)=>{
    try{
        const {id}=req.params
        const {status} = req.body

        const job = await Job.findById(id)

        if(!job){
            return res.status(400).json({
                message:"Job not found"
            })
        }

        if(job.user.toString() !== req.user.id){
            return res.status(401).json({message:"Not allowed"})
        }

        job.status = status
        await job.save()
        res.json({
            success:true,
            message:"job updated",
            data:job
        })
    }catch(err){
        res.status(500).json({
            message:"Server error"
        })}
}


exports.deleteJobs = async(req,res)=>{
    try{
        const {id} = req.params

        const job = await Job.findById(id)

        if(!job){
            return res.status(404).json({
                message:"Job not found"
            })
        }

        if(job.user.toString() !== req.user.id){
            return res.status(403).json({
                message:"Not allowed"
            })
        }

        await job.deleteOne()

        res.json({
            success:true,
            message:"Job deleted"
        })
    }catch(err){
        res.status(500).json({
            message:"Server error"
        })}
}