import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { userControllers } from '../controllers/UserController.js';

const router = express.Router();

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/:id', verifyToken , userControllers.user);

export default router;