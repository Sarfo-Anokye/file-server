const pg = require('pg');
const conString = "postgres://postgres:postgres@localhost:5432/fileServer";

const client = new pg.Client(conString);
client.connect((err: any)=>{
    if(err){
        console.log(err)
    }else {
        console.log('connected')
    }
});

module.exports=client;
export {}

