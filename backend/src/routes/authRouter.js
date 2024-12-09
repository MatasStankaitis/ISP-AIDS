import express from 'express';
import { registerController, loginController, logoutController, checkAuthController } from '#controllers/auth/authController.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.get('/check', checkAuthController);

export default router;