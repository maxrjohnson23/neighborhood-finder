module.exports = function(sequelize, DataTypes) {
    var Surveys = sequelize.define("Surveys", {
      Age: DataTypes.INTEGER,
      Hobbies: DataTypes.STRING,
      Industry: DataTypes.INTEGER,
      Income: DataTypes.INTEGER,
      Education: DataTypes.INTEGER,
      Children: DataTypes.INTEGER,
      Pets: DataTypes.INTEGER,
      Relationship_Status: DataTypes.INTEGER,
      Car: DataTypes.INTEGER,
      Social: DataTypes.INTEGER,
      Lifestyle: DataTypes.INTEGER
    });
    return Surveys;
  };
  