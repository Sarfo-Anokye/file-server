const express = require('express');
const client=require('../db');
// const fileupload = require("express-fileupload");
const getfilesRoute=express.Router();
const fs=require('fs')
// const serveIndex=require('serve-index');


getfilesRoute.get('/users',(req:any,res:any)=>{
    fs.readdir('./uploads', function (err:string, files:File) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        console.log(files)
            res.send(files)
        });
    });



module.exports=getfilesRoute;