const express=require("express");//框架
const router =express.Router();//路由
const passport=require("passport");//身份验证
const Profile =require("../../models/profile")//实体类

// $route    GET  api/profiles/test
//@desc 返回请求的JSON数据
//@access public
router.get("/test",(req,res)=>{
    res.json({msg:"profile works"})
})

// $route    POST  api/profiles/add
//@desc 创建信息接口
//@access private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields={};

    if(req.body.type) profileFields.type=req.body.type;
    if(req.body.describe) profileFields.describe=req.body.describe;
    if(req.body.incode) profileFields.incode=req.body.incode;
    if(req.body.expend) profileFields.expend=req.body.expend;
    if(req.body.cash) profileFields.cash=req.body.cash;
    if(req.body.remark) profileFields.remark=req.body.remark;
    new Profile(profileFields).save()
                        .then(profile=>{
                        res.json(profile);
                        })
                        .catch(err=>res.status(404).json("创建失败！")+err) //存储失败
})

// $route    GET  api/profiles
//@desc 获取所有信息接口
//@access private

router.get("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.find()
            .then(profile=>{
                if(!profile){
                    return res.status(404).json("没查到内容")
                }
                res.json(profile);
            }).catch(err=>res.status(404).json("查询出现问题！")+err)
})

// $route    GET  api/profiles/:id
//@desc 获取单个信息接口
//@access private

router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.id})
            .then(profile=>{
                if(!profile){
                    return res.status(404).json("没查到内容")
                }
                res.json(profile);
            }).catch(err=>res.status(404).json("查询出现问题！")+err)
})

// $route    POST  api/profiles/add
//@desc 编辑信息接口
//@access private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields={};

    if(req.body.type) profileFields.type=req.body.type;
    if(req.body.describe) profileFields.describe=req.body.describe;
    if(req.body.incode) profileFields.incode=req.body.incode;
    if(req.body.expend) profileFields.expend=req.body.expend;
    if(req.body.cash) profileFields.cash=req.body.cash;
    if(req.body.remark) profileFields.remark=req.body.remark;
    Profile.findOneAndUpdate(
        {
            //路由取值
            _id:req.params.id
        },
        {
            //需要更新
            $set:profileFields
        },
        {
            //这是一个新的东西
            new:true
        }
    ).then(profile=>res.json(profile))
    .catch(err=>res.status(404).json("修改失败"+res));
})


// $route    POST  api/profiles/delete/:id
//@desc 删除接口
//@access private
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findOneAndRemove({_id:req.params.id}).then(profile=>{
        profile.save().then(profile=>res.json(profile));
    })
    .catch(err=>res.status(404).json("删除失败"+res));
});


//**exports **返回的是模块函数
//**module.exports **返回的是模块对象本身，返回的是一个类
module.exports=router;