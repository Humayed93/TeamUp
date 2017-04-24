var logger = require('./logger.js');

module.exports = {
  database: "team",
  username: "root",
  password: "root",
  params: {
    port: 8889,//3306
    dialect: "mysql",
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    define: {
      underscored: true
    }
  },
  jwtSecret: "Y055zc1@4JG9",
  jwtSession: {session: false}
};
