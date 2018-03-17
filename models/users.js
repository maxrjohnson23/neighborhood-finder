module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      name: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.STRING
    });
    return Users;
  };
  