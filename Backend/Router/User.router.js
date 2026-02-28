import express from 'express';
import { getUserProfile, login, logout, profileUpdate, savePost, signup } from '../Controller/User.Controller.js';
import { authenticateUser } from '../MiddleWare/userAutho.js';
import upload from '../Utile/Multer.js';
import apiLimite from '../MiddleWare/rateLimites.js';

const router = express.Router();

router.post("/signup", apiLimite, signup);
router.post("/login", apiLimite, login);
router.get("/logout", logout);
router.get("/profile", authenticateUser, getUserProfile);
router.post("/profile/update", authenticateUser, upload.single("profileImage"), profileUpdate);
router.post("/save/:id", authenticateUser, savePost);

export default router;