import axios from "axios";

const api = axios.create({
    // baseURL : "https://eccomerce-mongoose.vercel.app/api/"
    baseURL : "http://localhost:3002/api/"
})

export default api