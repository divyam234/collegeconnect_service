'use strict';
module.exports = (sequelize, DataTypes) => {
  const request = sequelize.define('request', {
    requestId:{
      allowNull: false,
      type:DataTypes.STRING,
      primaryKey: true},
    message: DataTypes.STRING,
    status: {
     type:DataTypes.STRING,
     defaultValue:'open'
    },
    scheduleDate: DataTypes.STRING,
    scheduleTime: DataTypes.STRING,
    pmessage: DataTypes.STRING
  }, {});
  request.associate = function(models) {
   request.belongsTo(models.professor,{
        foreignKey :'professorId',
        sourceKey: 'professorId'
    })
   request.belongsTo(models.student,{
        foreignKey :'regNo',
        sourceKey: 'regNo'
    })
  };
  return request;
};