export default () => ({
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    database: process.env.DB_DATABASE,
    test_database: process.env.DB_DATABASE_TEST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
});
