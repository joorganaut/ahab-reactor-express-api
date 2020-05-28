require('dotenv').config();
let vtuPrefix = process.env['VTUPrefix']
let vtuUrl = process.env['VTURoute'];
let requeryUrl = process.env['VTURequeryRoute'];
let username = process.env['VTUUsername'];
let password = process.env['VTUPassword'];
module.exports = {
    vtuPrefix, vtuUrl, requeryUrl, username, password
}