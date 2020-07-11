'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('notices', {
      noticeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      subject:{
        type:Sequelize.STRING
      },
      composedMessage: Sequelize.STRING,
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
    return queryInterface.dropTable('notices');
  }
};