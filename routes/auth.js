import { Router } from "express";
import { isTokenValid, signup, signin, updateUsername, deleteUsername } from '../controllers/auth.js'

const router = Router();

router.post('/isTokenValid', isTokenValid);
router.post('/signup', signup);
router.post('/signin', signin);
router.put('/updateUsername', updateUsername);
router.delete('/deleteUsername', deleteUsername);

export default router;
