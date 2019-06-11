const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose=require("mongoose");
const User =mongoose.model("users");
const keys=require("../config/kes");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports=passport=>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
        User.findById(jwt_payload.id)
            .then(userz=>{
                if(userz){
                    return done(null,userz)
                }
                return done(null,false);
            })
            .catch(err=>console.log(err))
    }));
}