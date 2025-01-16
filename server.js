const express = require('express')
const app = express();
const dotenv = require("dotenv").config();
const connectDb = require ("./config/db")
const port = process.env.port || 3002


connectDb();
// middlewares 
app.use(express.json());

// route 
app.use('/api/file',require('./router/filesRoute'));  

app.listen(port, () => {
    console.log(`server is listening at ${port}....`)
})