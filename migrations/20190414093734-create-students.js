'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      regNo: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      imageuri: {
        type: Sequelize.STRING
      },
      passwordtoken:{
        type:Sequelize.STRING,
        allowNull: true
      },
      tokenexpire:{
        type:Sequelize.DATE,
        allowNull: true
      },
       batchid:{
        type:Sequelize.STRING,
      },
      semester:{
        type:Sequelize.STRING,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('students');
  }
};