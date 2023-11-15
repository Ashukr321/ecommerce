const express = require('express');
const app = express();
const env = require('dotenv');
const colors = require('colors');
const path = require('path');

const morgan = require('morgan');
const  CoonnectDb = require('./config/db')


// configure env 
env.config();
//database configure 
CoonnectDb();

//  configure ejs
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

//middlewares 
app.use(express.json());
app.use(morgan('dev'));

//routes
app.get('/',(req,res)=>{
  res.render(__dirname+path.join('/views/index.ejs'));
})

// listenning project on server 
app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port http://localhost:${process.env.PORT}`.green);
});