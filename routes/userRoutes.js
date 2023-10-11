import express from 'express';
import { signup, login, logout } from './../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
// router.post('/forgotPassword', forgotPassword);
// router.patch('resetPassword/:token', resetPassword);

// Protect all routes after this middleware
// router.use(protect);

export default router;
