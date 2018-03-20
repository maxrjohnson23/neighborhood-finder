module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      first_name: {
        type: DataTypes.STRING,
        notEmpty: true
      },
      last_name: {
        type: DataTypes.STRING,
        notEmpty: true
      },
      email: {
        DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_login: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      }
    });
    return Users;
  };
  