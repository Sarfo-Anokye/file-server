const express = require('express');
const client=require('../db');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const passwordRRoute=express.Router();


passwordRRoute.post('/reset-password/:id/:token',async(req:any,res:any)=>{
    const{id,token}=req.params
    const {password,confirm_password}=req.body
// console.log(password)
const hashpassword=await bcrypt.hash(password,10);
    //check if user exisst
    try {
        const query=await client.query("SELECT * FROM users WHERE id=$1",[id])
        if(query.rowCount!=0){
           await client.query("UPDATE users SET password=$1 WHERE id=$2 ",[hashpassword,id])
           res.json({message:'Password Rest succesfull'})
    
        }else{
            res.json({message:"failled to reset password "})
    
        }
    } catch (error:any) {
        console.log(error.message)
    }
   
    console.log(id)
    console.log(token)
    res.send(token)
})

module.exports=passwordRRoute;