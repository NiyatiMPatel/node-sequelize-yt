import express from 'express';
import { approveNote, getManageNotes } from '../controllers/admin.controller';

const router = express.Router();

// MANAGE NOTES VIEW - GET //
router.get('/manage-notes', getManageNotes);

// MANAGE NOTES APPROVAL - POST //
router.post('/approve', approveNote)

export default router;