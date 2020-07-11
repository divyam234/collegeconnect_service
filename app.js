const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const morgan = require('morgan')
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
}));
app.use(bodyParser.json({
    limit: '50mb',
    type: 'application/json'
}));
app.use('/profiles', express.static('profiles'));
app.use('/attachment', express.static('attachment'));
app.use(cors());
app.use(morgan('tiny'))
//app.use(jwt());
// api routes
app.use('/student', require('./controllers/student'));
app.use('/professor', require('./controllers/professor'));
// start server
const port = 4000;
const server = app.listen(port, 'localhost', function () {
    console.log('Server listening on port ' + port);
});