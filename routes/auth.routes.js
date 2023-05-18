
const {signUp, signIn} = require('../controllers/auth.controller');


module.exports = (app) => {
    app.post('/user/api/v1/signup', signUp);
    app.post('/user/api/v1/signin', signIn);
}