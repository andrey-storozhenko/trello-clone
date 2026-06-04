
import { registerUser,loginUser,logout } from "../controllers/authControllers";
import { Router } from 'express';

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);


export default router;