const express= require("express");
const app=express();
const port=8080;
const path=require("path");
const methodOverride = require('method-override');
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
const { v4: uuidv4 } = require('uuid');

let posts=[
    {
        id:uuidv4(),
    username:"nishant",
    content : "I love coding"
    },
    {
        id:uuidv4(),
        username:"amith",
        content:"you can do it",
    },
    {
        id:uuidv4(),
        username:"rahul",
        content:"Hii! My name is rahul",
    },

];




app.get('/posts',(req,res)=>{
    // res.send('server working well');
    res.render("index",{posts});
});

app.get("/posts/new",(req,res)=>{    //calling for the /posts/new path and that whatever the request will be sent then response will render 
    res.render("new.ejs");// getting the info that is present in new.js
});
//adding new account and creating unique id using uuidv4();
app.post("/posts",(req,res)=>{
    let id=uuidv4();//creating unique id
    let{username,content}=req.body;

    posts.push({id,username, content});//pushing the created object in array
    console.log(req.body);
    res.redirect("/posts");// redirecting to main page
});

//getting the detailed info about every posts by their unique ids
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;//storing the id that has been passed by the "/posts/:id"
    console.log(id);
    let post=posts.find((p)=>id===p.id);//finding the id in the array
    console.log(post);
    // res.send("request working");
    res.render("show.ejs",{post});//showing the details of the particular id stored in post

});
//patch request -updating the content 
app.patch("/posts/:id",(req,res)=>{
    let newContent=req.body.content;
    let{id}=req.params;//storing the id that has been passed by the "/posts/:id"
    let post=posts.find((p)=>id===p.id);
    post.content=newContent
    console.log(post);
    // res.send('patch is working');
    res.redirect("/posts");
});



app.get("/posts/:id/edit",(req,res)=>{
let{id}=req.params;
let post=posts.find((p)=>id===p.id);
 res.render("edit.ejs",{post});
});


app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
     posts=posts.filter((p)=>id!==p.id);
 
     res.redirect("/posts");
});
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});  



