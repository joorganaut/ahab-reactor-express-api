var express = require('express');
var router = express.Router();
var {AuthenticationSystem} = require('../bin/services/AuthenticationSystem');
var {XchangeSystem} = require('../bin/services/XchangeSystem');
/**
 * @swagger
 * definitions:
 *   AddXchangeRequest:
 *     properties:
 *       LoginUsername:
 *         type: string
 *       Password:
 *         type: string
 *       InstitutionCode:
 *         type: string
 *   AddXchangeResponse:
 *     properties:
 *       Code:
 *         type: string
 *       Message:
 *         type: string
 *       Error:
 *         type: string 
 */


/**
 * @swagger
 * /product-service/xchange:
 *   post:
 *     tags:
 *       - Add, Xchange
 *     description: Registers a new Xchange
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: AddXchangeRequest
 *         description: Add Xchange Request Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/AddXchangeRequest'
 *     responses:
 *       200:
 *         name: AddXchangeResponse
 *         description: returns a response object signifying success or failure with reason
 *         schema: 
 *           $ref: '#/definitions/AddXchangeResponse'
 */
/* POST retrieve all institution. */
router.post('/xchange', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["user"], async (response)=>{
        await new XchangeSystem(response).AddXchangeAsync();
    });
});
router.put('/xchange', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["user"], async (response)=>{
        await new XchangeSystem(response).UpdateXchangeAsync();
    });
});

router.get('/xchange', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["user"], async (response)=>{
        await new XchangeSystem(response).ViewAllXchangesAsync();
    });
});
router.get('/xchange/:id', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["*"], async (response)=>{
        await new XchangeSystem(response).ViewXchangeAsync();
    });
});
module.exports = router;
