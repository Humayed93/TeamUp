module.exports = (sequelize, DataType) => {
    const Members = sequelize.define("Members", {
        member_id: {
            type: DataType.INTEGER,
            primaryKey: true,
            references: {
                model: "Users",
                key: "id"
            }
        },
        states: {
            type: DataType.ENUM,
            values: ['ACTIVE', 'PENDING', 'REJECTED'],
            defaultValue: 'PENDING'
        }
    }, {
        classMethods: {
            associate: (models) => {
                //Members.belongsToMany(models.Users, {through: 'ProjectTags'});
                //Members.belongsTo(models.Projects);
                //Members.hasMany(models.Tasks);
            }
        }
    });
    return Members;
};
