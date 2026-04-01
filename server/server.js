const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
require("dotenv").config()
const authRoutes = require("./routes/authRoutes")


app.use(express.json())
app.use(cors())

app.use("/api/auth",authRoutes)

app.get("/",(req,res)=>{
    res.send("API is running")
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB connected")
)


app.listen(process.env.PORT,()=> console.log("Server running in port",process.env.PORT)
)