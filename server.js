// create an express app
const express = require("express")
const app = express()

// const path = require("path")
const fs = require('fs')
// const bodyParser = require('body-parser')
let jdata = JSON.parse(fs.readFileSync('public/data.json'));


// use the express-static middleware
app.use(express.static("public"))


app.get('/info', (req,res)=> {
    res.json(jdata)
})

// start the server listening for requests
let listener = app.listen(3000, 
	() => console.log(`App is running...`));