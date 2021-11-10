// create an express app
const express = require("express")
const app = express()

// const path = require("path")
const fs = require('fs')

const bodyParser = require('body-parser')
// const bodyParser = require('body-parser')
let jdata = JSON.parse(fs.readFileSync('public/data.json'));

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })

// use the express-static middleware
app.use(express.static("public"))


app.get('/info', (req,res)=> {
    res.json(jdata)
})


app.post('/mod', jsonParser, (req, res) => {
    for(let i=0; i<jdata.data.length; i++) {
        if(jdata.data[i].term == req.body.term) {
            jdata.data[i].description = req.body.description
            jdata.data[i].importance = req.body.importance
        }
    }
    res.sendStatus(200)
})


// start the server listening for requests
let listener = app.listen(3000, 
	() => console.log(`App is running...`));