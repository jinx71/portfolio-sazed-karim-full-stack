import { Router } from 'express';
import { handler } from '../utils/http.js';
import { login, logout, me } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/login', handler(login));
router.post('/logout', handler(logout));
router.get('/me', requireAuth, handler(me));

export default router;
