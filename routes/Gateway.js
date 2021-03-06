var express = require('express');
//const session = require('express-session');
var router = express.Router();
const {USSDProcessorServer} = require('../bin/services/USSDProcessorServer');
// var app = express();
// app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
/**
 * @swagger
 * definitions:
 *   USSDRequest:
 *     properties:
 *       command:
 *         type: string
 *       msisdn:
 *         type: string
 *       serviceCode:
 *         type: string
 *       content:
 *         type: string
 *       src:
 *         type: string
 *   USSDResponse:
 *     properties:
 *       command:
 *         type: string
 *       msisdn:
 *         type: string
 *       serviceCode:
 *         type: string
 *       content:
 *         type: string
 *       src:
 *         type: string
 */

/**
 * @swagger
 * /gateway/USSDServer:
 *   post:
 *     tags:
 *       - USSD
 *     description: process USSD requests
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: USSDRequest
 *         description: process USSD Request Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/USSDRequest'
 *     responses:
 *       200:
 *         description: returns a response object signifying success or failure with reason
 *         schema: 
 *           $ref: '#/definitions/USSDResponse'
 */
router.post('/USSDServer', async function(req, res, next) {
    let server = new USSDProcessorServer(req, res, next);
    await server.ProcessRequest();
});
module.exports = router;
