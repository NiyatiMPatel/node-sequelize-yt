import { Sequelize } from 'sequelize';
import sequelize from '../util/sqldatabase';

const NoteTag = sequelize.define('note_tag', {
 id: {
  type: Sequelize.INTEGER,
  allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  unique: true,
 }
});

export default NoteTag;