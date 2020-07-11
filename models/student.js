'use strict';
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    regNo: {
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
     batchid:{
        type:DataTypes.STRING,
      },
      semester:{
        type:DataTypes.STRING,
     },
     deviceToken:{
       type:DataTypes.STRING,
       defaultValue:null
     },
      hostel:{
      type:DataTypes.STRING,
      allowNull: true
    },
     course:{
      type:DataTypes.STRING,
      allowNull:true
     }
  }, {timestamps:false});
  student.associate = function(models) {
    student.hasMany(models.request,{
        foreignKey :'regNo',
        sourceKey: 'regNo'
    })
    student.hasMany(models.attendance,{
        foreignKey :'regNo',
        sourceKey: 'regNo'
    })
  }
  return student;
};