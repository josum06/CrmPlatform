import express from "express";
import { loginWithGoogle, logout, verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/logout", logout);
router.post("/google", loginWithGoogle);

// Add this route for getting current user info (protected)
router.get("/me", verifyToken, (req, res) => {
  // req.user is set by verifyToken middleware
  res.json({ user: req.user });
});

export default router;
