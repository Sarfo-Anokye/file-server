const express = require('express');
const client=require('./db')
const registerRoute=require('./controllers/registerRoute');
const loginRoute=require('./controllers/loginRoute');
const uploadRoute=require('./controllers/uploadRoute');
const getFilesRecordsRoute=require('./controllers/getFilesRecordsRoute');
const getfilesRoute=require('./controllers/getfilesRoute');
const filedownloadRoute=require('./controllers/filedownloadRoute');
const passwordResetRoute=require('./controllers/passwordResetRoute');
const passwordRRoute=require('./controllers/passwordRRoute');
// const fileupload = require("express-fileupload");
// const serveIndex=require('serve-index');
const cors=require('cors');
const app = express()
const port = 8080;

app.use(cors());
app.use(express.json())
// app.use(fileupload())
// app.use('/ftp',express.static('./uploads'),serveIndex('./uploads',{icons:true}))
app.use('/',registerRoute);
app.use('/',loginRoute); //rooute for authenticating login user
app.use('/',uploadRoute); //route for uploading files to the server
app.use('/',getFilesRecordsRoute); //route for getting files records from the database
app.use('/',getfilesRoute);  //route for fetching all files uploaded
app.use('/',filedownloadRoute); //route for downloadin a file
app.use('/',passwordResetRoute); //route for passing a valid email for password reset
app.use('/',passwordRRoute); // route for adding  new password to the database




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  // console.log(__dirname+"/uploads")
})


