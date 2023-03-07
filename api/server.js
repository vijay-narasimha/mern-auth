const express = require('express');
const mongoose = require('mongoose');
const router=require('./router')
const errorhandler=require('./errorcontroller')
const cookieparser=require('cookie-parser')



const app = express();
const port = 5000;

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieparser())
app.use('/',router)

app.use(errorhandler)



mongoose.connect(
  'mongodb://127.0.0.1:27017',
  {
    useNewUrlParser: true,
  }).then(
  () => {
    app.listen(port, () => {
      console.log(`listening`);
    });
  }
);
