const User = require('../models/users.models');



async function getAllusers(req, res){
   
      
    let reqObject = {};
    if(req.query.first_name){
        reqObject.name = req.query.first_name;
    }
    const result = await User.find(reqObject);

    res.send(result);
      
}

module.exports = {
    getAllusers
}