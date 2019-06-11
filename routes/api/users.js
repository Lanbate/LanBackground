const express=require("express");//框架
const router =express.Router();//路由
const bcrypt =require("bcrypt")//密码加密
const gravatar = require('gravatar');//公开头像
const keys=require("../../config/kes");
const jwt = require('jsonwebtoken');//Token 身份验证JSON Web Tokens
const User =require("../../models/User")//实体类
const passport=require("passport");//身份验证

// $route    GET  api/user/test
//@desc 返回请求的JSON数据
//@access public
// router.get("/test",(req,res)=>{
//     res.json({msg:"login works"})
// })

//注册
// $route    POST  api/user/register
//@desc 返回请求的JSON数据
//@access public
//请求消息(req)和响应消息(res)
router.post("/register",(req,res)=>{
    // console.log(req.body);
    //查询数据库是否佣有该邮箱
    //findOne返回一条数据
    User.findOne({email:req.body.email})
    .then((users)=>{
        if(users){
            //设置状态码res.status
            return res.status(400).json("邮箱已经被注册！")
        }else{
            const avatars = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

            const newUser=new User({
                name:req.body.name,
                email:req.body.email,
                avatar:avatars,
                password:req.body.password,
                identity:req.body.identity
            })
            //加密
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if(err) {
                        throw err;//抛出异常
                    }
                    newUser.password=hash;
                    newUser.save()//存储方法
                           .then(user=>res.json(user)) //存储成功
                           .catch(err=>console.log(err)) //存储失败
                });
            });
        }
    })
})

//$route POST api/users/login
//@desc 返回token jwt passort
//@access public
//登陆
router.post("/login",(req,res)=>{
    const emails=req.body.email;
    const password =req.body.password;
    //查询数据库
    User.findOne({email:emails})
        .then(user=>{
            if(!user){
                return res.status(404).json("用户不存在")
            }
            //密码匹配
            //compare（前端传来的值，数据库传来的值）
            bcrypt.compare(password,user.password)
                  .then(isMatch=>{
                      if(isMatch){
                          //规则
                          const rule={
                              id:user.id,
                              name:user.name,
                              avatar:user.avatar,
                              identity:user.identity
                            }
                        //   jwt.sign("规则","加密名字","过期时间","箭头函数")
                        jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,tokens)=>{
                            if(err){
                                throw err;
                            }
                            // console.log(User)
                            res.json({
                                success:true,
                                token:"Bearer  " + tokens
                            });
                        })
                        //   res.json({msg:"登陆成功！"})
                      }else{
                          return res.status(400).json("密码错误")
                      }
                  })
        })
})

//$route POST api/users/current
//@desc return current user
//@access private
//验证token
//router.get("/current","验证token",(req,res)=
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    });
})



//**exports **返回的是模块函数
//**module.exports **返回的是模块对象本身，返回的是一个类
module.exports=router;