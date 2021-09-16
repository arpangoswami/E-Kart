const User = require('../models/user');
exports.createOrUpdateUser = async (req,res) => {
    const {email,picture} = req.user;
    const user = await User.findOneAndUpdate({
        email: email,
    },{
        name: email.split("@")[0],
        picture: picture,
    },{
        new: true,
    });
    if(user){
        //console.log("UPDATED USER",user);
        res.json(user);
    }else{
        const newUser = await new User(
            {
                email: email,
                name: email.split("@")[0],
                picture: picture,
            }
        ).save();
        //console.log("CREATED USER",newUser);
        res.json(newUser);
    }
};

exports.currentUser = async (req,res) => {
    User.findOne({email: req.user.email}).exec((err,user) => {
        if(err){
            throw new Error(err);
        }
        //console.log("USER CURRENT: ",user);
        res.json(user);
    })
};