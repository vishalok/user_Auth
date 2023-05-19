const {getAllusers} = require('../controllers/user.controller');
const {verifyToken, } = require('../middlewares/auth');


module.exports = (app) => {
    app.get('/user/api/v1/getAllusers', verifyToken,getAllusers);
}