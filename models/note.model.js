import { Sequelize } from 'sequelize';
import sequelize from '../util/sqldatabase';

const Note = sequelize.define('note', {
 id: {
  type: Sequelize.INTEGER,
  allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  unique: true,
 },
 title: {
  type: Sequelize.STRING,
  allowNull: false,
 },
 description: {
  type: Sequelize.STRING,
  allowNull: false,
 },
 imageUrl: {
  type: Sequelize.STRING,
  allowNull: false,
 },
 status: {
  type: Sequelize.STRING,
  allowNull: false,
  defaultValue: 'Unapproved',
 }
});

export default Note