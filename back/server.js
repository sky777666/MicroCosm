require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
// const passport = require("passport")
// const bodyParser = require("body-parser")
// BodyParser is built into express !
// const passport = require("./config/passport")

const app = express()
app.use(cors())


app.use(express.urlencoded({extended: false}))
app.use(express.json())
// app.use(passport.initialize())


// FIXME: switch for HEROKU
// const db = process.env.MONGODB_URI
const uri = process.env.MONGODB_URI


//FIXME: uncomment for HEROKU
// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//FIXME: switch for HEROKU
 mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true } ).then((()=>console.log("Mongo is running on", process.env.MONGODB_URI))).catch(err => console.log(err))
 
 const db = mongoose.connection;
db.once('open', () => {
  console.log(`Connected to Mongo on ${db.host}:${db.port}`);
});
db.on('error', (err) => {
  console.log(`Database error:\n${err}`);
});
 
 
 //mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true } ).then((()=>console.log("Mongo is running on", process.env.MONGODB_URI))).catch(err => console.log(err))

// Atlas DB Hosting here -------
//  const uri = process.env.MONGODB_URI

// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//  mongoose.connect(uri).then((()=>console.log("Mongo is running on", uri ))).catch(err => console.log(err))

// app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
//     next()
// })

app.get("/", function(req, res){
    res.send("hello, World!\nServer is up and running")
})

//setup our routes
app.use("/api/users", require("./controllers/users"))
app.listen(process.env.PORT || 3001, () => console.log(`🌈 server is running on ${process.env.PORT}`))