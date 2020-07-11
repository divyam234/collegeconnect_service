'use strict';
module.exports = (sequelize, DataTypes) => {
  const professor = sequelize.define('professor', {
    professorId:{
      allowNull: false,
      type:DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    imageuri: DataTypes.STRING,
    passwordtoken:{
      type:DataTypes.STRING,
      allowNull: true
    },
    tokenexpire:{
      type:DataTypes.DATE,
      allowNull: true
    },
    deviceToken:{
       type:DataTypes.STRING,
       defaultValue:null
     }
  }, {timestamps: false});
  professor.associate = function(models) {
    professor.hasMany(models.request,{
        foreignKey :'professorId',
        sourceKey: 'professorId'
    })
     professor.belongsTo(models.department,{
        foreignKey:'deptId',
        sourceKey:'deptId'
    })
     professor.hasMany(models.registeredcourse,{
        foreignKey :'professorId',
        sourceKey: 'professorId'
    })
  };
  return professor;
};