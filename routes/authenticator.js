var express = require('express');
var router = express.Router();
var AuthenticationSystem = require('../bin/services/AuthenticationSystem').AuthenticationSystem;

/* POST authenticator token. */
router.post('/token', async function(req, res, next) {
    await AuthenticationSystem.GenerateToken(req, res);
});

// router.post('/verify', async function(req, res, next) {
//     let system = new AuthenticationSystem(req, res);
//     await system.AuthenticateToken();
// });

module.exports = router;
