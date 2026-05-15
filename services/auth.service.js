import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090/api/auth",
});


export const registerUser = async (userData)=>{
    return await API.post("/register", userData)
}

export const loginUser = async (userData)=>{
    return await API.post("/login", userData)
}
