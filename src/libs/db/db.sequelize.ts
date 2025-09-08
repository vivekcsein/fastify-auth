// import { Sequelize } from "sequelize";
// import { envMysqlConfig } from "../env/env.mysql";

// const sequelize = new Sequelize({
//   database: envMysqlConfig.MYSQL_DATABASE,
//   username: envMysqlConfig.MYSQL_USER,
//   password: envMysqlConfig.MYSQL_PASSWORD,
//   port: envMysqlConfig.MYSQL_PORT,
//   host: envMysqlConfig.MYSQL_HOST,
//   dialect: "mysql", // or 'mariadb' if using MariaDB
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
//   define: {
//     timestamps: true,
//     underscored: true,
//     freezeTableName: true,
//   },
//   dialectOptions: {
//     charset: "utf8mb4",
//     collate: "utf8mb4_unicode_ci",
//   },
// });

// export const connectSequelizeDatabase = async () => {
//   try {
//     // Test connection
//     await sequelize.authenticate();
//     console.log("Successfully connected to the database.");
//     // Sync models in development
//     if (process.env.NODE_ENV === "development") {
//       // Sync models with the database (optional, but recommended)
//       const DB_Sync: boolean = Boolean(envMysqlConfig.MYSQL_SYNC);
//       // Set force: true to drop and recreate tables
//       await sequelize.sync({ force: DB_Sync });
//       console.log("All models were synchronized successfully.");
//     }
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//     process.exit(1);
//   }
// };

// export default sequelize;
