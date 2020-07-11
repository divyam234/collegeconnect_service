const expressJwt = require('express-jwt');
const path      = require("path");
const config   = require(path.join(__dirname, '..', 'config', 'config.json'));
const jwt = ()=> {
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path: [
            '/users/student_register',
            '/users/login',
            '/professor/get_professor_list',
            '/users/request',
            '/professor/login',
            '/professor/register',
            '/users/update',
            '/users/fetch',
            '/users/fetchreq',
            '/professor/update',
            '/professor/fetch',
            '/professor/fetchreq',
            '/users/uploadimage'
        ]
    });
}
module.exports = jwt;