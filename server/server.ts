const express = require('express');
const client=require('./db')
// const registerRoute=require('./controllers/registerRoute');
const loginRoute=require('./controllers/loginRoute');
// const uploadRoute=require('./controllers/uploadRoute');
const getfilesRoute=require('./controllers/getfilesRoute');
const filedownloadRoute=require('./controllers/filedownloadRoute');
const passwordResetRoute=require('./controllers/passwordResetRoute');
// const passwordRRoute=require('./controllers/passwordRRoute');
// const fileupload = require("express-fileupload");
// const serveIndex=require('serve-index');
const cors=require('cors');
const app = express()
const port = 8080;

app.use(cors());
app.use(express.json())
// app.use(fileupload())
// app.use('/ftp',express.static('./uploads'),serveIndex('./uploads',{icons:true}))
// app.use('/',registerRoute);
app.use('/',loginRoute);
// app.use('/',uploadRoute);
app.use('/',getfilesRoute);
app.use('/',filedownloadRoute);
app.use('/',passwordResetRoute);
// app.use('/',passwordRRoute);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  // console.log(__dirname+"/uploads")
})


