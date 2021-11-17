require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
const cors=require("cors");
const User = require('./models/model.js')
const mongoose=require('./db/db.js')

const app=express()
const port=process.env.PORT||3000

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.json())


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.listen(port,()=>{
    console.log('Server is up on the port '+port+" !")
})

app.get('/',(req,res)=>{
    console.log("Welcome to backend server");
    res.send("Hello this is backend server of movie-ticketing website")
})

app.post('/signup', async (req, res) => {
    // console.log(req.body)
    //  res.send('testing!')
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send("Successfully Saved")
    } catch (error) {
        res.status(400).send(error)
    }
})

app.post('/login', async (req, res) => {
    try{
        // const user=await User.findByCredentials(req.body.name,req.body.password)

        const user = await User.findOne({name: req.body.name, password: req.body.password})
        .then((found) => {
            console.log(found);
            res.status(200).json(found)
        })
        .catch(err => {
            console.log("2");
            console.log(err);
        })
        
        // console.log(user);
        
    }catch(error){
        console.log("1");
        res.status(400).send(error)
    }
})