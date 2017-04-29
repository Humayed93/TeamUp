module.exports = (sequelize, DataType) => {
  const Tasks = sequelize.define("Tasks", {
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
    done: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    deadline: {
        type: DataType.DATE,
        allowNull: false
    },
      project_id: {
          type: DataType.INTEGER,
          references: {
              model: "Projects",
              key: "id"
          }
      }
  }, {
    classMethods: {
      associate: (models) => {
        Tasks.belongsTo(models.Members);
      }
    }
  });
  return Tasks;
};
