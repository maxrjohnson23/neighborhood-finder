module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      first_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      last_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_login: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
      }
    });
    return User;
  };
  