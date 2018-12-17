module.exports = (sequelize, DataTypes) => {
    var Grim = sequelize.define('Grim', {
      username: DataTypes.STRING,
	  pseudo: DataTypes.STRING,
	  age: DataTypes.STRING
    });
  
    return Grim;
  };