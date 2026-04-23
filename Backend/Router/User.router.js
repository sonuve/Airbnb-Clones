import express from 'express';
import { forgotPassword, getUserProfile, login, logout, profileUpdate, resetPassword, savePost, signup } from '../Controller/User.Controller.js';
import { authenticateUser } from '../MiddleWare/userAutho.js';
import upload from '../Utile/Multer.js';
import apiLimite from '../MiddleWare/rateLimites.js';
import passport from "passport";

const router = express.Router();


router.get("/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        accessType: "offline",
        prompt: "consent"
    })
);


router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        const { token } = req.user;

        // ✅ Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // required on HTTPS (Render)
            sameSite: "None", // required for cross-site
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
        });

        // ✅ Redirect to frontend
        res.redirect(
            `https://airbnb-clones-1.onrender.com/oauth-success?token=${token}`
        );
    }
);

router.post("/signup", apiLimite, signup);
router.post("/login", apiLimite, login);
router.get("/logout", logout);
router.get("/profile", authenticateUser, getUserProfile);
router.post("/profile/update", authenticateUser, upload.single("profileImage"), profileUpdate);
router.post("/save/:id", authenticateUser, savePost);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);



export default router;