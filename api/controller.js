const jwt = require('jsonwebtoken');
const catchasync=require('./catchasync')
const User=require('./model')
const AppError=require('./apperror')
const Email=require('./email')
const crypto=require('crypto')

const signtoken = (id,name) => {
  return jwt.sign({ id,name }, 'secrettoken', {
    expiresIn: '90d',
  });
};

const createtoken = (user, statuscode, req, res) => {
  const token = signtoken(user._id,user.name);

  const cookieoptions = {
    samesite:'none',
    secure:true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };
  console.log('token sent')
  res.cookie('jwt', token, cookieoptions).status(statuscode).json({
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
    console.log("user",newUser)
   await new Email(newUser).welcome()
    createtoken(newUser,201,req,res)
})

exports.login=catchasync(async (req,res,next)=>{
  console.log(req.body)
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
   await new Email(user).welcome()

    createtoken(user,200,req,res)
})

exports.logout=(req,res)=>{
    res.cookie('jwt','logout',{
        expires:new Date(Date.now()+10*1000)
    }).status(200).json({status:'success'})
}


exports.forgotpassword=catchasync(async (req,res,next)=>{
  const user=await User.findOne({email:req.body.email})
  // console.log(user)
  if (!user){
    return next(new AppError('there is no user with given email'))

  }
  const token=user.createtoken()
  await user.save({validateBeforeSave:false})

  await new Email(user,`http://localhost:5000/resetpassword/${token}`).token()
  res.status(200).json({
    token
  })
})

exports.resetpassword=catchasync(async (req,res,next)=>{
  const hashedtoken=crypto.createHash('sha256').update(req.params.token).digest('hex')
  const user=await User.findOne({passwordresettoken:hashedtoken})
  if(!user){
    return next(new AppError('token is invalid'))
    
  }
  user.password=req.body.password;
  user.passwordconfirm=req.body.passwordconfirm;
  user.passwordresettoken=undefined;
  await user.save()
  createtoken(user,200,req,res)
})

exports.profile=catchasync(async (req,res,next)=>{
const token=req.cookies?.jwt

if(token){
  jwt.verify(token,'secrettoken',(err,data)=>{
  
    res.json(data)
  })
}
else{
res.json('no token')
}
})