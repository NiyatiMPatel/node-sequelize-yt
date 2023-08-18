import express from 'express';
import { getIndex, getAddNote, postNote, getNoteDetails, getEditNoteDetails, updateNote, deleteNote, filterNotes } from '../controllers/notes.controller';

const router = express.Router();

// NOTES INDEX VIEW - GET //
router.get('/', getIndex);

// ADD NOTE VIEW - GET //
router.get('/add-note', getAddNote);

// ADD NEW NOTE - POST //
router.post('/add-note', postNote);

// VIEW SINGLE NOTE - GET //
router.get('/note/:id', getNoteDetails);

// EDIT SINGLE NOTE VIEW - GET //
router.get('/add-note/:id', getEditNoteDetails);

// UPDATE SINGLE NOTE - POST //
router.post('/edit-note', updateNote);

// DELETE SINGLE NOTE - POST //
router.post('/delete-note', deleteNote)

// FILTER NOTES BASED ON TAGS - POST //
router.post('/', filterNotes)

export default router;