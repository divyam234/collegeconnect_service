'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('noticetos', {
      toId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      toName: {
        type: Sequelize.STRING
      },
      type:Sequelize.STRING,
      course:{
        type:Sequelize.STRING,
        defaultValue:'all'
      },
      dept:{
        type:Sequelize.STRING,
        defaultValue:'all'
      },
      year:{
        type:Sequelize.INTEGER,
        defaultValue:0
      },
      hostel:{
        type:Sequelize.STRING,
        defaultValue:'all'
      },
      noticeId:{
        type: Sequelize.STRING,
        references: {
          model: 'notices',
          key: 'noticeId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('noticetos');
  }
};