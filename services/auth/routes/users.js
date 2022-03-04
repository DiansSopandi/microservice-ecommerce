import { Router } from "express";
import { register, login, getUser } from '../controllers/user';


const router = Router();

router.post('/register',register);

router.get('/login',login);
router.get('/:email',getUser);

export default router;