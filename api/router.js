const express=require("express")

const {signup,login,logout,profile,forgotpassword,resetpassword} =require('./controller')


const router=express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)
router.get('/forgotpassword',forgotpassword)
router.get('/resetpassword/:token',resetpassword)
router.get('/profile',profile)
module.exports=router