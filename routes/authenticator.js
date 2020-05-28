var express = require('express');
var router = express.Router();
var {AuthenticationSystem} = require('../bin/Services/AuthenticationSystem');

/* GET authenticator listing. */
router.post('/token', async function(req, res, next) {
    let system = new AuthenticationSystem(req, res, next, ['*'], (x)=>{});
    await system.GenerateToken();
});

// router.post('/verify', async function(req, res, next) {
//     let system = new AuthenticationSystem(req, res);
//     await system.AuthenticateToken();
// });

module.exports = router;
