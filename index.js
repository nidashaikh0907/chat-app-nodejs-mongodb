const express=require('express');
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const chat=require("./models/chat.js");
const methodOverride=require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/whatsapp");
}
//Index route
app.get("/chats",async (req,res)=>{
 let chats = await chat.find();
//  console.log(chats);
 res.render("index.ejs",{chats});
});

//new route
app.get("/chats/new",(req,res)=>{
 res.render("new.ejs");
});

//create route

app.post("/chats",(req,res)=>{
  let{from,to,msg}=req.body;
  let newChat=new chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date(),
  });
  newChat.save()
  .then((res)=>{
    console.log("Message Saved");
  })
  .catch((err)=>{
    console.error("Error saving message:");
  });
  res.redirect("/chats");
});

app.get("/",(req,res)=>{
    res.send("root is working");
});

//edit route

app.get("/chats/:id/edit", async (req,res)=>{
    let{id}=req.params; 
    let result= await chat.findById(id);
    res.render("edit.ejs",{chat:result});
});

//UPDATE route

app.put("/chats/:id",async (req,res)=>{
    let{id}=req.params;
    let{msg:newMsg}=req.body;
    let updatedchat= await chat.findByIdAndUpdate(
        id,
        {msg:newMsg},
        {runValidators:true, new:true}
    );
    console.log(updatedchat);
    res.redirect("/chats");
});

//destroy route
app.delete("/chats/:id",async (req,res)=>{
    let{id}=req.params;
    let deletedchat= await chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");
});

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});