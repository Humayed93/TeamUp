module.exports = (sequelize, DataType) => {
    const Tags = sequelize.define("Tags", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            associate: (models) => {
                Tags.belongsToMany(models.Projects, {through: 'ProjectTags'});
            }
        }
    });
    return Tags;
};
