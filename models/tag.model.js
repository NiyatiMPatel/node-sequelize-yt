import { Sequelize } from 'sequelize';
import sequelize from '../util/sqldatabase';

const Tag = sequelize.define('tag', {
 id: {
  type: Sequelize.INTEGER,
  allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  unique: true,
 },
 name: {
  type: Sequelize.STRING,
  allowNull: false,
 }
});

export default Tag;