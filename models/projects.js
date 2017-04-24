module.exports = (sequelize, DataType) => {
    const Projects = sequelize.define('Projects', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: {
            type: DataType.TEXT,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                //Projects.belongsTo(models.Users);
                Projects.belongsToMany(models.Tags, {through: 'ProjectTags'});
                Projects.hasMany(models.Members, {foreignKey: 'project_id'});
                //Projects.belongsTo(models.Invitations, {foreignKey: 'project_id'});
            }
        }
    });
    return Projects;
};
