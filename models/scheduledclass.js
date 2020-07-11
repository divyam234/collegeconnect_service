'use strict';
module.exports = (sequelize, DataTypes) => {
  const scheduledclass = sequelize.define('scheduledclass', {
    batchId:{
     allowNull: false,
     primaryKey: true,
     type: DataTypes.STRING,
    },
    classcode:{
     allowNull: false,
     primaryKey: true,
     type: DataTypes.STRING,
    },
    semester: {
     allowNull: false,
     primaryKey: true,
     type: DataTypes.STRING,
    },
    scheduleDate:{
     allowNull: false,
     primaryKey: true,
     type: DataTypes.STRING,
    },
    message:{
     type:DataTypes.STRING
    }
  }, {timestamps:false});
  scheduledclass.associate = function(models) {
    scheduledclass.belongsTo(models.professor,{
        foreignKey:'professorId',
        sourceKey:'professorId'
    })
  };
  return scheduledclass;
};