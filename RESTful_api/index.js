const express = require("express");
const app = express();
const port = 3030;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log(`Server is started at port ${port}`);
})

let posts = [
    {
        id : uuidv4(),
        username:"shubhanshu_singh",
        content:"I Love Coding and I am the Best Coder",
    },
    {
        id : uuidv4(),
        username:"Sameer",
        content:"I Love Cooking and I am the Best Chef",
    },
    {
        id : uuidv4(),
        username:"Remo",
        content:"I Love Racing and I am the Best Racer",
    }
]

// show all post here
app.get("/posts",(req,res)=>{
    res.render("main",{posts})
})

// open form to get new post details .
app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
})


// form ki post request ko recieve karega 
app.post("/posts",(req,res)=>{
    let {username , content} = req.body;
    // console.log(req.body);
    posts.push({ id:uuidv4(),username , content});
    res.redirect("/posts");//ye by default get request p bhejega 
})


// to see in detail . 
app.get("/posts/:id", (req,res)=>{
    let{id} = req.params;
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    res.render("show.ejs",{post})
    if (!post) {
    return res.status(404).render("error.ejs");
    }
}) 

app.patch("/posts/:id",(req,res)=>{
    let{id} = req.params;
    let newContent = req.body.content;
    // console.log(newContent);
    let post = posts.find((p) => id === p.id);
    post.content = newContent;//reset kardia post k content ko .     //abhi filhal hopscoth se horahh h 
    // console.log(post);
    res.redirect("/posts");
})

// ye naya form banata h aur request bhejta h ⬆️ uppar patch ko , with method-ovverride .
app.get("/posts/:id/edit", (req,res)=>{
   let{id} = req.params;
   let post = posts.find((p) => id === p.id);
   res.render("newForm.ejs",{post});
})

app.delete("/posts/:id", (req,res)=>{
    let{id} = req.params;
    posts = posts.filter((p) => id !== p.id);
   res.redirect("/posts")
})

app.use((req,res)=>{
    res.status(404).render("error.ejs");
})