import express from "express";

import {
  loginUser,
  signupUser,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import requireAuth from "../midddleware/requireAuth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);

// Protected profile routes
router.use(requireAuth);
router.get("/me", getProfile);
router.put("/me", updateProfile);

export default router;
