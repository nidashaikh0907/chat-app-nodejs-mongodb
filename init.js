const mongoose=require("mongoose");
const chat=require("./models/chat.js");


main().then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/whatsapp");
}
let allchat=[{
    from:"nida",
    to:"Riya",
    msg:"send me your exam sheet",
    created_at:new Date(),
},
{
    from:"shreya",
    to:"rohit",
    msg:"Teach me js callbacks",
    created_at:new Date(),
},
{
    from:"neha",
    to:"preeti",
    msg:"Call me will going to the college",
    created_at:new Date(),
},
{
    from:"tony",
    to:"petter",
    msg:"how was the day?",
    created_at:new Date(),
},
];

chat.insertMany(allchat); 

