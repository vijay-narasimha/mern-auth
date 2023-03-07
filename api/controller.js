const jwt = require('jsonwebtoken');
const catchasync=require('./catchasync')
const User=require('./model')
const AppError=require('./apperror')

const signtoken = (id) => {
  return jwt.sign({ id }, 'secrettoken', {
    expiresIn: '90d',
  });
};

const createtoken = (user, statuscode, req, res) => {
  const token = signtoken(user._id);

  const cookieoptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };
  res.cookie('jwt', token, cookieoptions);
  res.status(statuscode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};


exports.signup=catchasync(async (req,res,next)=>{

    const newUser=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordconfirm:req.body.passwordconfirm
    })

    createtoken(newUser,201,req,res)
})

exports.login=catchasync(async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email){
        return next(new AppError('please provide email'),400)
    }
    if (!password){
        return next(new AppError('please provide password'),400)
    }
    const user=await User.findOne({email})
    if (!user || !(await user.checkpassword(password,user.password))){
        return next(new AppError('incorrect email or password'),401)
    }
    createtoken(user,200,req,res)
})

exports.logout=(req,res)=>{
    res.cookie('jwt','logout',{
        expires:new Date(Date.now()+10*1000)
    })
    res.status(200).json({status:'success'})
}