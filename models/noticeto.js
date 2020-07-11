'use strict';
module.exports = (sequelize, DataTypes) => {
  const noticeto = sequelize.define('noticeto', {
  	toId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    type:DataTypes.STRING,
    course:{
    	type:DataTypes.STRING,
    	defaultValue:'all'
    },
    dept:{
    	type:DataTypes.STRING,
    	defaultValue:'all'
    },
    year:{
    	type:DataTypes.STRING,
    	defaultValue:'all'
    },
    hostel:{
    	type:DataTypes.STRING,
    	defaultValue:'all'
    },
  }, {timestamps: false});
  noticeto.associate = function(models) {
    // associations can be defined 
    noticeto.belongsTo(models.notice,{
        foreignKey:'noticeId',
        sourceKey:'noticeId'
    })
  };
  return noticeto;
};