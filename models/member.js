module.exports = (sequelize, DataType) => {
    const Members = sequelize.define("Members", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        classMethods: {
            associate: (models) => {
                //Members.belongsToMany(models.Users, {through: 'ProjectTags'});
                Members.belongsTo(models.Projects);
                Members.hasMany(models.Tasks);
            }
        }
    });
    return Members;
};
