const express = require('express');
const client=require('../db');
const getFilesRecordsRoute=express.Router();


getFilesRecordsRoute.get('/filesrecords',async(req:any,res:any)=>{
    try {
        const filerecords= await client.query("SELECT * FROM files")
        if(filerecords){
            console.log(filerecords.rows)
            res.json(filerecords.rows)
        }else{
            console.log('No files')
            res.json({message:'No Records Found'})
        }
        
    } catch (error) {
        console.log(error)
    }

})






module.exports=getFilesRecordsRoute;