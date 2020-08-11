var express = require('express');
var router = express.Router();
var {AuthenticationSystem} = require('../bin/services/AuthenticationSystem');
var {AccountSystem} = require('../bin/services/AccountSystem');
var {ProductSystem} = require('../bin/services/ProductSystem');
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
 * /corebanking/Account/AddCustomerAccount:
 *   post:
 *     tags:
 *       - Add, Customer Account
 *     description: add account to customer 
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *         type: string
 *         required: true
 *         description: authorization token e.g. 'Bearer {token}'
 *         example: 'Bearer {token}'
 *       - name: AddAccountRequest
 *         description: Add Account Request Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/AddAccountRequest'
 *     responses:
 *       200:
 *         description: returns a response object signifying success or failure with reason
 *         schema: 
 *           $ref: '#/definitions/AddAccountResponse'
 */
router.post('/Account/AddCustomerAccount', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["CoreBanking"], async (response)=>{
        await new AccountSystem(response).OpenAccountAsync();
    });
});
router.post('/Product/AddProduct', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["CoreBanking"], async (response)=>{
        await new ProductSystem(response).AddProductAsync();
    });
});
router.get('/Product/ViewAllProduct', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["CoreBanking"], async (response)=>{
        await new ProductSystem(response).ViewAllProductsAsync();
    });
});
router.put('/Product/UpdateProduct', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["CoreBanking"], async (response)=>{
        await new ProductSystem(response).UpdateProductAsync();
    });
});
module.exports = router;
