const express = require("express")
const router = express.Router()

const{addJob, getJobs, updateJob, deleteJobs} = require("../controllers/jobController")

const {protect} = require("../middleware/authMiddleware")

router.post("/",protect,addJob)
router.get("/",protect,getJobs)
router.put("/:id",protect,updateJob)
router.delete("/:id",protect,deleteJobs)

module.exports = router
