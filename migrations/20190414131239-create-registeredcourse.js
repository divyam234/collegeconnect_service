'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('registeredcourses', {
      batchId: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      semester: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      classcode: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      course: {
        type: Sequelize.STRING
      },
      classTitle: {
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('registeredcourses');
  }
};