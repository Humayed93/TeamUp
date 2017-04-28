module.exports = (sequelize, DataType) => {
    const Invitations = sequelize.define("Invitations", {
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
        },
        message: {
            type: DataType.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        skillList: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        states: {
            type: DataType.ENUM,
            values: ['ACCEPTED', 'PENDING', 'REJECTED'],
            defaultValue: 'PENDING'
        }
    }, {
        classMethods: {
            associate: (models) => {
                Invitations.belongsTo(models.Users, {foreignKey: 'sender_id'});
                Invitations.belongsTo(models.Users, {foreignKey: 'receiver_id'});
                Invitations.belongsTo(models.Projects, {foreignKey: 'project_id'});
            }
        }
    });
    return Invitations;
};
