import express from 'express';
import { machine } from '../controllers/machine.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/:id', verifyToken, machine);

export default router;
