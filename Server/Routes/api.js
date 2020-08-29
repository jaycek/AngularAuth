const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const db='mongodb+srv://jayce:c2Ihf9p7Xei0tYMr@mycluster.wyqji.mongodb.net/eventsdb?retryWrites=true&w=majority';
const User = require('../models/user');
const jwt = require('jsonwebtoken');


mongoose.connect(db,function(err){
    if(err){
        console.error(err);
    }
    else{
        console.log("Connected to MongoDB");
    }
})



router.get('/',(req,res)=>{
    res.send("From API");
})

router.post('/register',(req,res)=>{

    let userData=req.body;
    let user=new User(userData);
    
    user.save((err,registeredUser)=>{
        if(err){
            console.error(err);
        }
        else{
            let payload = {subject:user._id};
            let token = jwt.sign(payload,'secretkey123');
            res.status(200).send({token});
            // res.status(200).send(registeredUser);
        }
    })

})

router.post('/login',(req,res)=>{

    let userData= req.body;
User.findOne({email:userData.email},(err,user)=>{
    if(err){
        console.log(err);
    }
    else{
        if(!user){
            res.status(401).send("Invalid email");
        }
        else if(user.password != userData.password){
            res.status(401).send("Invalid password");
        }
        else{
            let payload = {subject:user._id};
            let token = jwt.sign(payload,'secretkey123');
            res.status(200).send({token});
            // res.status(200).send(user);
        }
    }

})

})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.send(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ') [1];
    if(token==='null'){
        return res.send(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token,'secretkey123');
    if(!payload){
        return res.send(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();

}
router.get('/events',(req,res)=>{
    let events=[
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23"
        },
        {
            "_id":"2",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23"
        },
        {
            "_id":"3",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23"
        },
        {
            "_id":"4",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23"
        },
        {
            "_id":"5",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23"
        },
        {
            "_id":"6",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23"
        }
    ]
    res.send(events);

})


router.get('/special',verifyToken,(req,res)=>{
    let events=[
        {
            "_id":"1",
            "name":"Auto Expo Special",
            "description":"lorem ipsum",
            "date":"2012-04-23"
        },
        {
            "_id":"2",
            "name":"Auto Expo Special",
            "description":"lorem ipsum",
            "date":"2012-04-23"
        },
        {
            "_id":"3",
            "name":"Auto Expo Special",
            "description":"lorem ipsum",
            "date":"2012-04-23"
        },
        {
            "_id":"4",
            "name":"Auto Expo Special",
            "description":"lorem ipsum",
            "date":"2012-04-23"
        },
        {
            "_id":"5",
            "name":"Auto Expo Special",
            "description":"lorem ipsum",
            "date":"2012-04-23"
        },
        {
            "_id":"6",
            "name":"Auto Expo Special",
            "description":"lorem ipsum",
            "date":"2012-04-23"
        }
    ]
    res.send(events);

})

module.exports = router;