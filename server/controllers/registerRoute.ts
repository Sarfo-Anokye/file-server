const express = require('express');
const client=require('../db');
const registerRoute=express.Router();
const {body,validationResult}=require ('express-validator');
const bcrypt=require('bcrypt');


registerRoute.post('/register',[ //using express validator to validate incoming formadata
  body('fname').trim().isString().notEmpty().withMessage('invalid full name '),
  body('password').trim().isLength(4).withMessage('invalid password'),
  body('email').trim().isEmail().withMessage('invalid email').normalizeEmail().toLowerCase(),
  body('c_password').custom((value:any,req:any)=>{
    if(value !== req.body.password){
       throw new Error('password do not match')
    }
    return true;
  })

], async (req:any, res:any) => {
  //validating form data with express-validator
  const formErrors:string[]=[];
  try {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
  errors.array().forEach((err:any)=>{ //pushing error messages to forErrors variable
    formErrors.push(err.msg)
  })
  console.log(formErrors)
  res.json(formErrors);
  return;
  //end of form validating
    }
    // console.log(req.body)
    
    //if no errors proceed to the below codes
    const {fname,email,password}=req.body;  //collecting form fields from req body object
    const hashpassword=await bcrypt.hash(password,10); //hsashing user password
  // check if user exists
  const checkquery=await client.query("SELECT * FROM users WHERE email=$1",[email]);
  if(checkquery.rowCount===0){
    
    const insertquery=await client.query("INSERT INTO users (full_name,email,password) VALUES ($1,$2,$3)",[fname,email,hashpassword])
    res.send('sumbited')
  }else{
    res.send('user already Exist')
  }
  
  } catch (error) {
    console.log(error)
  }

 
})

module.exports=registerRoute;