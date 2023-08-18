// SQL DATABASE CONNECTION. RETURN A CONNECTION OBJECT ALLOWING TO RUN QUERIES

import { Sequelize } from 'sequelize';
import * as dotenv from "dotenv";
dotenv.config();

// CREATE NEW SEQUELIZE OBJECT AND IT WILL AUTOMATICALLY CONNECT TO DATABASE -- SET UP CONNECTION POOL
// DATABASE, USERNAME, PASSWORD, OPTIONS
const sequelize = new Sequelize('youtube-nodejs-sequelize', 'root', process.env.PASSWORD, {
 dialect: 'mysql',
 host: 'localhost',
 logging: false
});

export default sequelize; // EXPORT SEQUELIZE OBJECT (DATABASE CONNECTION POOL) MANAGED BY SEQUELIZE