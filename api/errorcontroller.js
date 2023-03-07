const AppError = require('./apperror');

const sendError = (err, req, res) => {
  return res.status(err.statuscode).json({
    status: err.status,
    message: err.message,
    error:err
  });
};
const handlevalidation = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `${errors.join('---')}`;
  
  return new AppError(message, 400);
};

const handleduplicate=(err)=>{
    
    
    const value=Object.keys(err.keyValue)[0]

    
     const message = `Duplicate field value: ${value},please use another value`;
     return new AppError(message, 400);
}

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || 'error';

  let error = { ...err };
  error.message=err.message
  error.name=err.name 
  if(error.code===11000) error=handleduplicate(error)
  if (error.name==='ValidationError') error=handlevalidation(error)

  sendError(error, req, res);
};
