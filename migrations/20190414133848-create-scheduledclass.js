'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('scheduledclasses', {
      batchId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      classcode: {
      	allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      semester: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      professorId: {
        type: Sequelize.STRING,
        references: {
          model: 'professors',
          key: 'professorId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      scheduleDate: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DATE,
      },
      message:{
      	type:Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('scheduledclasses');
  }
};