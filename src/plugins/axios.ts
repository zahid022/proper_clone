import axios from "axios";

const api = axios.create({
    baseURL : "https://eccomerce-mongoose.vercel.app/api/"
})

export default api