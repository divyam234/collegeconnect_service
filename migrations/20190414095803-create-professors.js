'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('professors', {
      professorId: {
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
      deptId:{
        type: Sequelize.STRING,
        references: {
          model: 'departments',
          key: 'deptId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      passwordtoken:{
        type:Sequelize.STRING,
        allowNull: true
      },
      tokenexpire:{
        type:Sequelize.DATE,
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('professors');
  }
};