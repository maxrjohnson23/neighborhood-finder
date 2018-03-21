module.exports = function (sequelize, DataTypes) {
    const Social = sequelize.define("Social", {
        name: DataTypes.STRING
    });

    Social.associate = (models) => {

        Social.belongsToMany(models.Surveys, {
            through: "SurveySocial"
        });
    };

    return Social;
};