require('dotenv').config();
let VTUPrefix = process.env['VTUPrefix']
let VTUUrl = process.env['VTURoute'];
let RequeryUrl = process.env['VTURequeryRoute'];
let Username = process.env['VTUUsername'];
let Password = process.env['VTUPassword'];
module.exports = {
    VTUPrefix, VTUUrl, RequeryUrl, Username, Password
};