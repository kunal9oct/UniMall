import express from 'express';
import multer from 'multer';
import { machine } from '../controllers/machine.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
app.use(upload.any());

router.post('/:id', verifyToken, machine);

export default router;
