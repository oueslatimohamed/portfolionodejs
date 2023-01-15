import express from 'express'
import { editProfile, profile, signin, signup } from '../controllers/userController.js';
import { protect } from '../middlewares/authorization.js';
import multer from '../middlewares/multer.js';

const router = express.Router();

router
.route("/signup")
.post(multer,signup)

router
.route("/signin")
.post(signin);

router
.route("/profile")
.get(protect,profile);

router
.route("/editprofile")
.get(protect,editProfile);

export default router;
