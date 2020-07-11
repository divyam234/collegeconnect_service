'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('attendances',{
      regNo:{
         type: Sequelize.STRING,
         allowNull: false,
         primaryKey:true
      },
      classcode: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        defaultValue:'A'
      },
      absentDate: {
      allowNull: false,
      primaryKey: true,
       type: Sequelize.DATE
     },
     batchId: {
      allowNull: false,
       type: Sequelize.STRING
     }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('attendances');
  }
};