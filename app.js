//jshint esversion: 6


const express= require("express");
const bodyParser = require("body-parser");
const request=require("request");
const https= require("https");

const app=express();
app.use(express.static("public")); // this is used to load the static pages in the server.
app.use(express.urlencoded({extended:true}));

app.get("/",function(req,res){res.sendFile(__dirname+"/index.html");});

app.post("/",function(req,res){

    const username=req.body.user;
    const email=req.body.email;
    const password=req.body.password;

    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: username,
                    LNAME: password
                }
            }
        ]
    }

    var jsonData= JSON.stringify(data);
    const url="https://us1.api.mailchimp.com/3.0/lists/8f2168c547"
    const options ={
        method:"POST",
        auth: "bhaskar1:53bbcf5d9b0d86de71841028d2cc314d-us1"
    }

    const request=https.request(url,options,function(response){

        if (response.statusCode===200){
            res.sendFile(__dirname+"/failure.html");}
            else{res.sendFile(__dirname+"/failure.html");}
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

    
});

app.post("/failure",function(req,res){
    res.redirect("/")
})


app.listen(process.env.PORT||3000,function(){  // see this we used both local and heroku port for our website to check 
    console.log('server is up and running at port 3000');
});



// api key :- 53bbcf5d9b0d86de71841028d2cc314d-us1
// list id :- 8f2168c547  this will help the mailchimp to identify in which list do we need to get into.