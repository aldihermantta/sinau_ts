import { Sequelize } from "sequelize";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
const path = require('path');

const dbName = process.env.DB_NAME as string;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD;
const dbDialect = "postgres";

const folderPath = path.join(__dirname, '../log'); 

if (!fs.existsSync(folderPath)) {
     fs.mkdirSync(folderPath);
} 
const logFilePath = path.join(__dirname, '../log/sequelize.log'); 

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
	host: dbHost,
	dialect: dbDialect,
     logging: (log) => {
          fs.appendFileSync(logFilePath, `${log}\n`);
     }
});

export default sequelizeConnection;