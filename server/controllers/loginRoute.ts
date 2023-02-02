const express = require('express');
const client=require('../db');
const loginRoute=express.Router();
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcrypt')

//LOGGIN INTO THE SYSTEMS ROUTE
//CHECK IF USER EMAIL AND PASSWORD ARE VALID
//CHECK FOR USER ROLE
//SEND A RESPONSE TO THE BROWSER

loginRoute.post('/',[
    // body('email').isEmail().withMessage('invalid Email'),
    // body('password').isEmpty().withMessage('invalid password')
],async(req:any,res:any)=>{
    const loginErrors=[];
    try {
        // const errors=validationResult(req);
        // if(!errors.isEmpty()){
        //     errors.array().forEach(err => {
        //         loginErrors.push(err.msg)
                
        //     });
        //     // res.json({Errors:loginErrors});
        //     return
        // }
        const {email,password}=req.body;
    //    const hashedpassword=await client.query("SELECT password FROM users WHERE email=$1",[email])
    //    console.log(hashedpassword) //get hasshed password
        //check if email and password exist
    const checkuser=await client.query("SELECT * FROM users WHERE email=$1 ",[email]);
    // const getRole=await client.query("SELECT role FROM users WHERE email=$1",[email])  // query to get role from users table
    // const role=await getRole.rows[0].role //saving value of user role to the variable
    // console.log(checkuser.rows[0].role)
    if(checkuser.rowCount===0){
        res.json({isauth:false})
        console.log(false)
    }else{

       const bool=await bcrypt.compare(password,checkuser.rows[0].password)
    //    console.log(bool)
       if(bool){
        console.log(checkuser.rows[0].role)
        const userRole=await checkuser.rows[0].role
        res.json({isauth:true,userrole:userRole,username:checkuser.rows[0].full_name});
        console.log(true)
        // console.log(checkuser)
       }
        
    }
    } catch (error) {
        console.log(error)
    }
   
    
})

module.exports=loginRoute;