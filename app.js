const Datastore = require('nedb');
const bcrypt = require("bcrypt");
const wages = new Datastore("wages.db");
const users = new Datastore("users.db");
const express = require('express');

const app = express();
wages.loadDatabase();
users.loadDatabase();
app.use(express.json({limit:"10mb"}));
app.use(express.static('public'));
const port = process.env.port || 3000;


function IsNullOrUndefined(array){
    for(let element of array){
        if (element == null || element == undefined)
            return true;
    }
    return false;
}

app.listen(port,()=>{console.log("App running")});


app.post("/users/register",async (req,res)=>{
    if(IsNullOrUndefined([request.body.name,requst.body.password]))
        return res.statusCode(400).send("Given data was incorrect");
    const hashPassword = await bcrypt.hash(request.body.password,10);
    let user = {
        name : request.body.name,
        password : hashPassword,
        searchCount : 3,
        searchedFor:[],
        role : "",

    };
    users.insert(user,(err,u)=>{
        if(err)
            res.statusCode(400).send("could not create new user");
        res.statusCode(201).send("user created");
    });
});


