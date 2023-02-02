const express = require('express');
const client=require('../db');
// const fileupload = require("express-fileupload");
const filedownloadRoute=express.Router();
// const multer=require('multer');


filedownloadRoute.post('/download',async (req:any,res:any)=>{
    const {filename}= req.body;
    console.log(filename)
    //slicincg filename to get the actual filename
    const pos=filename.indexOf('_')
    const slicedfilename=filename.slice(pos+1)  //varaible containg the sliced filename
    //---------------------------------
    res.download(`./uploads/${filename}`)
try {
    const fileinDb=await client.query("SELECT * FROM files WHERE file_name LIKE $1 ",[slicedfilename])  //checking if filename exits in the database
    // console.log(fileinDb)
    const fileID=await fileinDb.rows[0].id //getting the id of the file
    const downloadValue=await fileinDb.rows[0].downloads; //getting the download value of the file
    const incrementDownload=downloadValue+1; //incremting the download value after each download
    // console.log(downloadnumber)
    // console.log(incrementDownload)
    
    client.query("UPDATE files SET downloads=$1 WHERE id=$2",[incrementDownload,fileID]) //updating the download value of the file in the database
    
} catch (error) {
    console.log(error)
}
    
})

module.exports=filedownloadRoute;