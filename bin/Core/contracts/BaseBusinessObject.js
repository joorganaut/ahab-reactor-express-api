const sequelize = require('sequelize')

// Creation of the model "client"
var client = sequelize.define('client', {
    // Here are the columns of the table
    family_name: {type: Sequelize.STRING},
    surname: {type: Sequelize.STRING},
    title: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING}
  });