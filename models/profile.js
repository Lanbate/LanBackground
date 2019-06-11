const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的构成。
const profileSchema = new Schema({
    type: {
        type: String, //收据类型
    },
    describe: {
        type: String, //收支描述
    },
    incode: {
        type: String, //收入
        required: true //字段是否是必须的
    },
    expend: {
        type: String, //支出
        required: true //字段是否是必须的
    },
    cash: {
        type: String, //账户金额
        required: true //字段是否是必须的
    },
    remark: {//备注
        type: String, //数据类型
    },
    date: {
        type: Date,//时间
        default: Date.now //创建的时间多少
    }
})

//**module.exports **返回的是模块对象本身，返回的是一个类
module.exports = profile = mongoose.model("profilesz", profileSchema);