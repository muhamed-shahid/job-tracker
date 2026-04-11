const mongoose = require("mongoose")


const jobSchema = new mongoose.Schema({
    position:{type:String,
                required:true
    },
    company:String,
    location:String,
    status:{
        type:String,
        enum:["APPLIED","INTERVIEW","OFFER","REJECTED"],
        default:"APPLIED"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    }

},{timestamps:true})


module.exports = mongoose.model("Job",jobSchema)