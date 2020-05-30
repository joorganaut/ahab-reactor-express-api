var express = require('express');
var router = express.Router();
var AuthenticationSystem = require('../bin/services/AuthenticationSystem').AuthenticationSystem;


/**
 * @swagger
 * /authenticate/token:
 *   post:
 *     tags:
 *       - Generate, Token
 *     description: Generates a Token for api calls
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: TokenRequest
 *         description: Token Request Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TokenRequest'
 *     responses:
 *       200:
 *         name: TokenResponse
 *         description: returns a response object with token, expiry and response signifying success or failure with reason
 *         schema: 
 *           $ref: '#/definitions/TokenResponse'
 */
/* POST authenticator token. */
router.post('/token', async function(req, res, next) {
    await AuthenticationSystem.GenerateToken(req, res);
});

// router.post('/verify', async function(req, res, next) {
//     let system = new AuthenticationSystem(req, res);
//     await system.AuthenticateToken();
// });

module.exports = router;
