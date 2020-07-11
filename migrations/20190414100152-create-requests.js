'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('requests', {
      requestId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      message: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        defaultValue:'open'
      },
      scheduleDate: {
        type: Sequelize.STRING
      },
      scheduleTime: {
        type: Sequelize.STRING
      },
      pmessage: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      professorId:{
        type: Sequelize.STRING,
        references: {
          model: 'professors',
          key: 'professorId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      regNo:{
        type: Sequelize.STRING,
        references: {
          model:'students',
          key:'regNo',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      } 
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('requests');
  }
};