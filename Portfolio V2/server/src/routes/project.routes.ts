import { Router } from 'express';
import { handler } from '../utils/http.js';
import { requireAuth } from '../middleware/auth.js';
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';

const router = Router();

router.get('/', handler(listProjects));
router.get('/:id', handler(getProject));
router.post('/', requireAuth, handler(createProject));
router.put('/:id', requireAuth, handler(updateProject));
router.delete('/:id', requireAuth, handler(deleteProject));

export default router;
