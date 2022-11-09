const express = require('express')
const cors = require('cors');
const mongoose=require('mongoose')
const config=require('./configuration/config')

const app = express();

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: false }))

app.use("/app", require('./route/route.js'))

mongoose.connect(config.dburl).then(() => {
    app.listen(9091, () => { console.log("server started at port: 9091") }) 
    
}).catch((e) => {console.log("error in database connectivity....\n",e)});

