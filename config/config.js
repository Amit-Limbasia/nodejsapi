const { DB_HOST, DB_PASS, DB_DB, DB_USER } = process.env;
module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_DB,
    host: DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      useUTC: false,
    },
    timezone: "+5:30",
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_DB,
    host: DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      useUTC: false,
    },
    timezone: "+05:30",
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_DB,
    host: DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      useUTC: false,
    },
    timezone: "+5:30",
  },
};
