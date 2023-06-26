import { Router } from "express";

import { isTokenValid, signup, signin, updateUsername, deleteUsername } from '../controllers/auth.js'
import verifyAuth from '../middleware/verifyAuth.js'
const router = Router()

router.get('/isTokenValid', isTokenValid, verifyAuth);
router.post('/signup', signup);
router.post('/signin', signin);
router.put('/updateUsername', verifyAuth, updateUsername);
router.delete('/deleteUsername', deleteUsername);

export default router;