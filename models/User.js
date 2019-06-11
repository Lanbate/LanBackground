const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的构成。
const UserSchema = new Schema({
    name: {
        type: String, //数据类型
        required: true //字段是否是必须的
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    identity: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now //创建的时间多少
    },
})

//**module.exports **返回的是模块对象本身，返回的是一个类
module.exports = User = mongoose.model("users", UserSchema);