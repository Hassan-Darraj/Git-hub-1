import { Router } from "express";
import AuthController from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";


const router = Router();

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post("/logout", authenticate, AuthController.logout);
router.post('/get-current-login-info',authenticate, AuthController.register)
router.post('/change-password', AuthController.changePassword)


export default router;