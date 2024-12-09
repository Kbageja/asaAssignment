const { DataTypes } = require('sequelize');
const sequelize = require('../db.config');

const AsaUser = sequelize.define('asauser',{
    username:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
    },
    password:{
        type:DataTypes.STRING,
    },
},{
    timestamps: true,
    alter:true,
    tableName: 'asauser'
  })
  const userWeather = sequelize.define('userweather',{
    username:{
        type:DataTypes.STRING,
    },
    searchCity:{
        type:DataTypes.STRING,
    },  
},{
    timestamps: true,
    alter:true,
    tableName: 'userweather'
  })

  module.exports={AsaUser,userWeather}