const http = require('http');
const express = require('express');
const cors    = require('cors');
const bodyParser = require('body-parser');
const app = express()
const expressAsyncHandler=require("express-async-handler")

const hostname = 'localhost';

const port = 3001;

require("dotenv").config();

const DBurl=process.env.DBURL;

mclient=require("mongodb").MongoClient;
let formObject;
mclient.connect(DBurl)
.then((client)=>{
  let dbobj=client.db("Appointment");
  formObject=dbobj.collection("Users");
  app.set("formObject",formObject);
  console.log("DB connection success");
})
.catch((error)=>{
  console.log("Error in DB connection");
})



app.use(bodyParser.urlencoded({extended : false}));

app.use(bodyParser.json());

app.use(cors());

app.post('/user',expressAsyncHandler(async(request,response)=>{
  let data=request.body;
  //console.log(data);
 // request.app.get("formObject");
  await formObject.insertOne(data)
  response.send({message:"Submitted successfully"});
}));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});