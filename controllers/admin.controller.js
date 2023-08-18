import NoteModel from '../models/note.model'
import TagModel from '../models/tag.model';

// // MANAGE NOTES VIEW - GET - WITHOUT TAG ASSOCIATION//
// export const getManageNotes = (req, res, next) => {
//   NoteModel.findAll().then((notes) => {
//     // console.log("🚀 ~ file: admin.controller.js:6 ~ NoteModel.findAll ~ notes:", notes)
//     res.render('admin/index', {
//       pageTitle: 'Manage notes',
//       path: '/manage-notes',
//       notes: notes,
//     });
//   }).catch((err) => {
//     console.log("🚀 ~ file: admin.controller.js:6 ~ getManageNotes ~ err:", err)
//   })
// };

// MANAGE NOTES VIEW - GET - WITH TAG ASSOCIATION//
export const getManageNotes = (req, res, next) => {
  NoteModel.findAll({
    include: {
      model: TagModel,
      as: 'tags'
    }
  }).then((notes) => {
    // console.log("🚀 ~ file: admin.controller.js:26 ~ NoteModel.findAll ~ notes:", notes)
    res.render('admin/index', {
      pageTitle: 'Manage notes',
      path: '/manage-notes',
      notes: notes,
    });
  }).catch((err) => {
    console.log("🚀 ~ file: admin.controller.js:33 ~ getManageNotes ~ Error fetching notes:", err)
  })
};

// MANAGE NOTES APPROVAL - POST //
export const approveNote = (req, res, next) => {
  const { id } = req.body;
  NoteModel.findOne(
    {
      where: {
        id: id,
      }
    })
    .then((note) => {
      let newStatus = 'Unapproved'
      if (note.status === 'Unapproved') {
        newStatus = 'Approved'
      }
      return NoteModel.update({
        status: newStatus
      },
        {
          where:
          {
            id: id
          }
        })
    })
    .then((updatedNote) => {
      // console.log("🚀 ~ file: admin.controller.js:63 ~ .then ~ updatedNote:", updatedNote)
      res.redirect('/admin/manage-notes')
    })
    .catch((err) => {
      console.log("🚀 ~ file: admin.controller.js:66 ~ approveNote ~ Error while approving note:", err)
    })
}