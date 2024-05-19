import express from 'express';
import { assignUser } from '../controllers/assignUser.js';

const router = express.Router();

router.post('/:id', assignUser);

export default router;
