'use strict';
module.exports = (sequelize, DataTypes) => {
  const attendance = sequelize.define('attendance', {
    regNo:{
        type: DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
      }, 
      classcode: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      status: {
        type:DataTypes.STRING,
        defaultValue:'A'
      },
      absentDate: {
        allowNull: false,
        primaryKey: true,
        type:DataTypes.DATE
    },
    batchId: {
      allowNull: false,
       type:DataTypes.STRING
     }
  }, {timestamps:false});
  attendance.associate = function(models) {
    attendance.belongsTo(models.student,{
        foreignKey:'regNo',
        sourceKey:'regNo'
    })
  }
  return attendance;
};