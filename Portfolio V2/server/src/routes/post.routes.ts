import { Router } from 'express';
import { handler } from '../utils/http.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';
import {
  listPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller.js';

const router = Router();

router.get('/', optionalAuth, handler(listPosts));
router.get('/:slug', optionalAuth, handler(getPostBySlug));
router.post('/', requireAuth, handler(createPost));
router.put('/:id', requireAuth, handler(updatePost));
router.delete('/:id', requireAuth, handler(deletePost));

export default router;
