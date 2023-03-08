import axios from 'axios'

const url='http://localhost:5000'

export const signup=(newUser)=>axios.post(`${url}/api/signup`,newUser)
export const login=(user)=>axios.post(`${url}/api/login`,user)
export const logout=()=>axios.get(`${url}/api/logout`)