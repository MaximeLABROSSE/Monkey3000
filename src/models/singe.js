module.exports = (sequelize, DataTypes) => {
    var Singe = sequelize.define('Singe', {
      username: DataTypes.STRING,
	  race: DataTypes.STRING,
	  age: DataTypes.INTEGER,
	  
    })
	
    return Singe;
  };