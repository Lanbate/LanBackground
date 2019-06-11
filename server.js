const express = require("express");
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const passport=require("passport");
const app =express();

//引入user.js
const usersz =require("./routes/api/users");
const profilesz =require("./routes/api/profiles");

//获取数据库连接
const db= require("./config/kes").mongoURI;

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


//连接数据库
mongoose.connect(db)
        .then(()=>console.log("连接数据库成功！"))
        .catch(err=>console.log(err))

//passport初始化
app.use(passport.initialize());
require("./config/passport")(passport);

app.get("/",(req,res)=>{
    res.send("Hello World!");
})

//用中间件使用routes
app.use("/api/users",usersz);
app.use("/api/profiles",profilesz);

const port =process.env.port || 2800;

app.listen(port,()=>{
    console.log(`在端口上运行的服务器 ${port}`)
})