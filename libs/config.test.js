module.exports = {
  database: "TeamUp_test",
  username: "root",
  password: "root",
  params: {
    dialect: "mysql",
    logging: false,
    define: {
      underscored: true
    }
  },
  jwtSecret: "4R21W68$hv",
  jwtSession: {session: false}
};
