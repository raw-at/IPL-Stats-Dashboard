const express = require('express');
//const mongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/db');
const mysql = require('mysql');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));


//Mysql Connection:
const connection = mysql.createConnection({
    host:config.host,
    user:config.user,
    password:config.password,
    database:config.database
})


connection.connect(function(err) {
    if (err) throw err;
    require('./routes/index')(app,connection);
    console.log("Connected!");
  });
  
/*
mongoClient.connect(config.url, (err, client)=> {
    if(err) throw err;
    console.log("Connected successfully to server");
   
    const db = client.db(config.database);
    
    require('./routes/index')(app,db);

    app.listen(port,()=>{
        console.log('Server started on port '+port);
    })

  });



*/
app.listen(port,()=>{
    console.log('Server started on port '+port);
})


