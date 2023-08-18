import * as dotenv from "dotenv";

import express from 'express';
import path from 'path';

import bodyParser from 'body-parser';

import rootDir from './util/path';
import sequelize from "./util/sqldatabase";

import NoteModel from './models/note.model';
import UserModel from './models/user.model';
import TagModel from "./models/tag.model";
import NoteTagModel from "./models/notetag.model";

import adminRoutes from './routes/admin.router';
import noteRoutes from './routes/notes.router';

import { get404 } from "./controllers/errors.controller";

// =================================================== //

dotenv.config();

const app = express();

// create application/json parser
app.use(bodyParser.json())
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))

// SERVING FILES STATICALLY FOR STATIC FILES ONLY HAS READ ACCESS
app.use(express.static(path.join(rootDir, 'public')))

// TEMPLATING ENGINE EJS FOR VIEWS
app.set('view engine', 'ejs');
app.set('views', 'views');

// =================================================== //

// MIDDLEWARE FOR USER ASSOCIATION //
app.use((req, res, next) => {
 UserModel.findByPk(1).then((user) => {
  // console.log("🚀 ~ file: index.js:42 ~ UserModel.findByPk ~ user:", user)
  req.user = user;
  next();
 }).catch((err) => {
  console.log("🚀 ~ file: index.js:42 ~ app.use ~ err:", err)
 })
})

// IMPORT ROUTES
app.use('/admin', adminRoutes);
app.use(noteRoutes);

// CATCH ALL ROUTES (404 ERROR)
app.use(get404);

// =================================================== //

// NOTES WITHOUT USER ASSOCIATION AND TAGS ASSOCIATION //
// sequelize.sync()
//  .then((result) => {
//   // console.log("🚀 ~ file: index.js:58 ~ sequelize.sync ~ result:", result)
//   app.listen(process.env.PORT);
//  }).catch(error => {
//   console.log("🚀 ~ file: index.js:58 ~ sequelize.sync ~ error:", error)
//  });

// =================================================== //

UserModel.hasMany(NoteModel); // USERID AS FOREIGN KEY IN NOTES TABLE
NoteModel.belongsTo(UserModel, { constraints: true, onDelete: 'CASCADE' });

NoteModel.belongsToMany(TagModel, { through: NoteTagModel });
TagModel.belongsToMany(NoteModel, { through: NoteTagModel });

// NOTES WITH USER ASSOCIATION AND TAGS ASSOCIATION //
sequelize.sync()
 .then((synced) => {
  return UserModel.findByPk(1);
 })
 .then((user) => {
  // console.log("🚀 ~ file: index.js:79 ~ .then ~ user:", user)
  if (!user) {
   return UserModel.create({
    name: 'Himat Singh',
    email: 'himat@gmail.com',
    password: '61011'
   });
  }
  return user;
 })
 .then((resultUser) => {
  // console.log("🚀 ~ file: index.js:95 ~ .then ~ resultUser:", resultUser)
  return TagModel.findAll()
 })
 .then((tags) => {
  // console.log("🚀 ~ file: index.js:99 ~ .then ~ tags:", tags)
  if (!tags || !tags.length) {
   const tags = [
    'Programming', 'Web Development', 'Database', 'Networking', 'Algorithm', 'Computer'
   ]
   tags.map((tag) => {
    TagModel.create({
     name: tag
    }).then((resultTags) => {
     console.log("🚀 ~ file: index.js:108 ~ returntags.map ~ resultTags:", resultTags)
     // return resultTags
    }).catch((err) => {
     console.log("🚀 ~ file: index.js:108 ~ returntags.map ~ err:", err)
    });
   });
  }
 })
 .then(() => {
  app.listen(process.env.PORT);
 }).catch(error => {
  console.log("🚀 ~ file: index.js:58 ~ sequelize.sync ~ error:", error);
 });