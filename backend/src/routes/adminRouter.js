import { getUsersController, approveUserController, disapproveUserController } from '#controllers/auth/adminController.js';
import { isAuthenticated, hasRole } from '#middleware/authMiddleware.js';
import express from 'express';

const router = express.Router();

router.get('/users', getUsersController);
router.post('/approve-user', approveUserController);
router.post('/disapprove-user', disapproveUserController);

export default router;