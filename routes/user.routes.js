const {getAllusers} = require('../controllers/user.controller');
const {verifyToken, } = require('../middlewares/auth');


module.exports = (app) => {
    app.get('/mba/api/v1/getAllusers', verifyToken,getAllusers);
}