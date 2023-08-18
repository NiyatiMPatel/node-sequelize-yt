import NoteModel from '../models/note.model';
import TagModel from '../models/tag.model';

// ========================== WITHOUT USER ASSOCIATION AND TAGS ASSOCIATION ================= //

// // NOTES INDEX VIEW - GET //
// export const getIndex = (req, res, next) => {
//  NoteModel.findAll({
//   where: {
//    status: 'Approved'
//   }
//  }).then((notes) => {
//   // console.log("🚀 ~ file: notes.controller.js:6 ~ NoteModel.findAll ~ notes:", notes)
//   res.render('notes/index', {
//    pageTitle: 'Notes',
//    path: '/',
//    notes: notes,
//   })
//  }).catch((err) => {
//   console.log("🚀 ~ file: notes.controller.js:6 ~ NoteModel.findAll ~ err:", err)
//  })

// };

// // ADD NOTE VIEW - GET //
// export const getAddNote = (req, res, next) => {
//  res.render('notes/add-note', {
//   pageTitle: 'Add a note',
//   path: '/add-note',
//   isEditMode: '',
//  })
// };

// // ADD NEW NOTE - POST //
// export const postNote = (req, res, next) => {
//  const { title, description, imageUrl } = req.body;
//  NoteModel.create({
//   title,
//   description,
//   imageUrl,
//   // status: 'Unapproved'
//  }).then((note) => {
//   // console.log("🚀 ~ file: notes.controller.js:28 ~ postNote ~ note:", note)
//   res.redirect('/')
//  }).catch((err) => {
//   console.log("🚀 ~ file: notes.controller.js:28 ~ postNote ~ err:", err)
//  })
// }

// // VIEW SINGLE NOTE - GET //
// export const getNoteDetails = (req, res, next) => {
//  const { id } = req.params;
//  NoteModel.findByPk(id).then((note) => {
//   // console.log("🚀 ~ file: notes.controller.js:47 ~ NoteModel.findByPk ~ note:", note)
//   res.render('notes/note', {
//    pageTitle: 'View note details',
//    path: '/note/:id',
//    notes: note,
//   })
//  }).catch((err) => {
//   console.log("🚀 ~ file: notes.controller.js:47 ~ getNoteDetails ~ err:", err)
//  })
// }

// // EDIT SINGLE NOTE VIEW - GET //
// export const getEditNoteDetails = (req, res, next) => {
//  const { id } = req.params;
//  const { isEditing } = req.query
//  NoteModel.findOne({
//   where: {
//    id: id
//   }
//  }).then((note) => {
//   // console.log("🚀 ~ file: notes.controller.js:65 ~ getEditNoteDetails ~ note:", note)
//   res.render('notes/add-note', {
//    pageTitle: 'Edit a note',
//    path: '',
//    isEditMode: isEditing,
//    notes: note
//   })
//  }).catch((err) => {
//   console.log("🚀 ~ file: notes.controller.js:61 ~ getEditNoteDetails ~ err:", err)
//  })
// }

// // UPDATE SINGLE NOTE - POST //
// export const updateNote = (req, res, next) => {
//  const { title, description, imageUrl, id } = req.body;
//  NoteModel.update({
//   title,
//   description,
//   imageUrl,
//  },
//   {
//    where: {
//     id: id
//    }
//   }
//  ).then((note) => {
//   // console.log("🚀 ~ file: notes.controller.js:94 ~ ).then ~ note:", note) note: [1]
//   res.redirect(`/note/${id}`)
//  }).catch((err) => {
//   console.log("🚀 ~ file: notes.controller.js:92 ~ updateNote ~ err:", err)
//  })
// }

// // DELETE SINGLE NOTE - POST //
// export const deleteNote = (req, res, next) => {
//  const { id } = req.body
//  NoteModel.destroy({
//   where: {
//    id: id
//   }
//  }).then((result) => {
//   // console.log("🚀 ~ file: notes.controller.js:109 ~ deleteNote ~ result:", result) result: 1
//   res.redirect('/')
//  }).catch((err) => {
//   console.log("🚀 ~ file: notes.controller.js:109 ~ deleteNote ~ err:", err)
//  })
// }


// ========================== WITH USER ASSOCIATION AND TAGS ASSOCIATION ================= //

// NOTES INDEX VIEW - GET // CHANGED
export const getIndex = (req, res, next) => {
 req.user.getNotes({
  where: {
   status: 'Approved'
  },
  include: {
   model: TagModel,
   as: 'tags'
  }
 }).then((notes) => {
  // console.log("🚀 ~ file: notes.controller.js:136 ~ req.user.getNotes ~ notes:", notes)
  TagModel.findAll().then((tags) => {
   res.render('notes/index', {
    pageTitle: 'Notes',
    path: '/',
    notes: notes,
    tags: tags,
    selectedTags: [],
   })
  }).catch((err) => {
   console.log("🚀 ~ file: notes.controller.js:146 ~ getIndex ~ Error while fetching tags:", err)
  })
 }).catch((err) => {
  console.log("🚀 ~ file: notes.controller.js:149 ~ req.user.getNotes ~ Error while fetching notes:", err)
 })
};

// FILTER NOTES BASED ON TAGS - POST //
export const filterNotes = (req, res, next) => {
 const { tagIds } = req.body
 let numTagIds = tagIds
 if (tagIds.length > 1) {
  numTagIds = tagIds.map(Number)
 }
 req.user.getNotes({
  where: {
   status: 'Approved'
  },
  include: {
   model: TagModel,
   as: 'tags',
   where: {
    id: tagIds
   }
  }
 }).then((notes) => {
  // console.log("🚀 ~ file: notes.controller.js:172 ~ req.user.getNotes ~ notes:", notes)
  TagModel.findAll().then((tags) => {
   res.render('notes/index', {
    pageTitle: 'Filtered notes',
    path: '/',
    notes: notes,
    tags: tags,
    selectedTags: numTagIds,
   })
  }).catch((err) => {
   console.log("🚀 ~ file: notes.controller.js:182 ~ getIndex ~ Error while fetching tags:", err)
  })
 }).catch((err) => {
  console.log("🚀 ~ file: notes.controller.js:185 ~ req.user.getNotes ~ Error while fetching notes:", err)
 })
}

// ADD NOTE VIEW - GET //
export const getAddNote = (req, res, next) => {
 TagModel.findAll().then((tags) => {
  // console.log("🚀 ~ file: notes.controller.js:192 ~ TagModel.findAll ~ tags:", tags)
  res.render('notes/add-note', {
   pageTitle: 'Add a note',
   path: '/add-note',
   isEditMode: '',
   tags: tags,
   selectedTags: []
  })
 }).catch((err) => {
  console.log("🚀 ~ file: notes.controller.js:201 ~ getAddNote ~ Error while fetching tags:", err)
 })
};

// ADD NEW NOTE - POST // CHANGED
export const postNote = (req, res, next) => {
 const { title, description, imageUrl, tagIds } = req.body;
 req.user.createNote({
  title,
  description,
  imageUrl,
 })
  .then((createdNote) => {
   // console.log("🚀 ~ file: notes.controller.js:214 ~ .then ~ createdNote:", createdNote)
   if (tagIds && tagIds.length > 0) {
    TagModel.findAll({
     where: {
      id: tagIds
     }
    }).then((tags) => {
     createdNote.addTags(tags)
      .then((tag) => {
       res.redirect('/')
      }).catch((err) => {
       console.log("🚀 ~ file: notes.controller.js:225 ~ createdNote.addTags ~ Error adding tags :", err)
      })
    }).catch((err) => {
     console.log("🚀 ~ file: notes.controller.js:228 ~ .then ~ Error fetching tags:", err)
    })
   } else {
    res.redirect('/')
   }
  }).catch((err) => {
   console.log("🚀 ~ file: notes.controller.js:234 ~ req.user.createNote ~ Error adding note:", err)
  })
}

// VIEW SINGLE NOTE - GET //
export const getNoteDetails = (req, res, next) => {
 const { id } = req.params;
 NoteModel.findByPk(id, { include: { model: TagModel, as: 'tags' } })
  .then((note) => {
   // console.log("🚀 ~ file: notes.controller.js:243 ~ NoteModel.findByPk ~ note:", note)
   res.render('notes/note', {
    pageTitle: 'View note details',
    path: '/note/:id',
    notes: note,
   })
  }).catch((err) => {
   console.log("🚀 ~ file: notes.controller.js:250 ~ getNoteDetails ~ Error fetching note:", err)
  })
}

// EDIT SINGLE NOTE VIEW - GET //
export const getEditNoteDetails = (req, res, next) => {
 const { id } = req.params;
 const { isEditing } = req.query
 NoteModel.findOne({
  where: {
   id: id
  },
  include: {
   model: TagModel,
   as: 'tags'
  },
 }).then((note) => {
  // console.log("🚀 ~ file: notes.controller.js:267 ~ getEditNoteDetails ~ note:", note)
  TagModel.findAll().then((tags) => {
   res.render('notes/add-note', {
    pageTitle: 'Edit a note',
    path: '',
    isEditMode: isEditing,
    notes: note,
    tags: tags,
    selectedTags: note.tags.map((tag) => tag.id), //not.tags is array of objects  ==>  array of ids
   })
  }).catch((err) => {
   console.log("🚀 ~ file: notes.controller.js:278 ~ getEditNoteDetails ~ Error fetching tags:", err)
  })
 }).catch((err) => {
  console.log("🚀 ~ file: notes.controller.js:281 ~ getEditNoteDetails ~ Error fetching note:", err)
 })
}

// UPDATE SINGLE NOTE - POST //
export const updateNote = (req, res, next) => {
 const { title, description, imageUrl, id, tagIds } = req.body;
 NoteModel.update({
  title,
  description,
  imageUrl,
 },
  {
   where: {
    id: id
   }
  }
 ).then((note) => {
  // console.log("🚀 ~ file: notes.controller.js:299 ~ ).then ~ note:", note) note: [1]
  NoteModel.findByPk(id, {
   include: TagModel,
   as: 'tags'
  }).then((noteWithTag) => {
   if (tagIds && tagIds.length > 0) {
    TagModel.findAll({
     where: {
      id: tagIds
     }
    }).then((tags) => {
     return noteWithTag.setTags(tags);
    }).then(() => {
     res.redirect(`/note/${id}`)
    }).catch((err) => {
     console.log("🚀 ~ file: notes.controller.js:314 ~ ).then ~ Error updating tags:", err)
    })
   } else {
    res.redirect(`/note/${id}`)
   }
  }).catch((err) => {
   console.log("🚀 ~ file: notes.controller.js:320 ~ ).then ~ Error fetching note:", err)
  })
 }).catch((err) => {
  console.log("🚀 ~ file: notes.controller.js:323 ~ updateNote ~ Error updating note:", err)
 })
}

// DELETE SINGLE NOTE - POST //
export const deleteNote = (req, res, next) => {
 const { id } = req.body
 NoteModel.destroy({
  where: {
   id: id
  }
 }).then((result) => {
  // console.log("🚀 ~ file: notes.controller.js:335 ~ deleteNote ~ result:", result) result: 1
  res.redirect('/')
 }).catch((err) => {
  console.log("🚀 ~ file: notes.controller.js:338 ~ deleteNote ~ Error deleting note:", err)
 })
}

