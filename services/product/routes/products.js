import { Router } from "express";
import { create, buy } from '../controllers/product';

const router = Router();

router.post('/create',create);
router.get('/buy',buy);

export default router;