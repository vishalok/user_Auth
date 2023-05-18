const bcrypt = require('bcrypt');
const User = require('../models/users.models');
const jwt = require('jsonwebtoken');
const { response } = require("express");
async function signUp(req, res){
   

    const userObject = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    }

    try{
        await User.create(userObject);
        res.send({
            msg : 'user has been created succesfully'
        })
    }catch(err)
    {
        res.status(400).send({
            msg: 'user have not been created succesfully',
            err
        })
    }


}

async function signIn(req,res){
    let user = await User.findOne({
        email: req.body.email
    });

    if(!user){
        return res.status(400).send({
            msg: 'UserID/Password does not match in DB.',
            token: null
        })
    }

    let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if(!isPasswordValid){
        return res.status(400).send({
            msg: 'UserID/Password does not match in DB.',
            token: null
        }) 
    }

    const token = await jwt.sign({id :user._id}, 'heyeyehehyhhyh' ,{
        expiresIn: 1200
    });

    const responseObject = {
        first_name : user.first_name,
        last_name: user.last_name,
        email: user.email,
        token: token
    }

    res.send({msg: 'User loggedin successfully', responseObject});

}

module.exports = {
    signUp,
    signIn
}