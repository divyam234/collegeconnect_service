'use strict';
module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('department', {
    deptId: {
      allowNull: false,
      type:DataTypes.STRING,
      primaryKey: true,
    },
    deptName: DataTypes.STRING
  },{timestamps: false});
  department.associate = function(models) {
    department.hasMany(models.professor,{
        foreignKey :'deptId',
        sourceKey: 'deptId'
    })
  };
  return department;
};