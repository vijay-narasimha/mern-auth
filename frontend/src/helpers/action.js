import {SIGNUP,LOGIN,LOGOUT} from './types'

import * as api from './api'

export const signup=(newUser)=>async(dispatch)=>{
    try{
        const {data}=await api.signup(newUser)
        dispatch({type:SIGNUP,payload:data})
    }catch(err){
        console.log(err.message)
    }
}

export const logout=()=>async(dispatch)=>{
    try{
        await api.logout()
        dispatch({type:LOGOUT})
    }catch(err){
        console.log(err.message)
    }
}
export const login=(user)=>async(dispatch)=>{
    try{
        const {data}=await api.login(user)
        
        dispatch({type:LOGIN,payload:data})
    }catch(err){
        console.log(err.message)
    }
}