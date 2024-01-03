import axios from 'axios'
const baseurl="http://localhost:8081"
export default axios.create({
    baseURL:baseurl
})