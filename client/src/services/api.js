import axios from "axios"

const API = axios.create({baseURL:"http://localhost:8851/api"})

export default API