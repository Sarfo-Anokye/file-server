const express = require('express');
const client=require('../db');
// const fileupload = require("express-fileupload");
const uploadRoute=express.Router();
const multer=require('multer');


    const storage=multer.diskStorage({
        destination:(req:any,file:any,cb:any)=>{
            cb(null,'./uploads');
        },
        filename:(req:any,file:any,cb:any)=>{
            cb(null,`${Date.now()}_${file.originalname}`);
        },
    })
    
    const upload=multer({storage});


    uploadRoute.post('/upload',upload.single('filename'),async(req:any,res:any)=>{
        const file=req.file;
        const {title}=req.body
        const {description}=req.body
        const downlods=0;
       console.log(title)
       console.log(description)
       console.log(file)
       
        // console.log(file.get('body'))
        if(file){
           await client.query("INSERT INTO files (file_name,file_title,file_description,downloads) VALUES ($1,$2,$3,$4)",[file.originalname,title,description,downlods])
            res.send('upload sucessful')
        }else{
            res.send('failled to upload')
        }

    })
  

   


    






module.exports=uploadRoute;