import express from 'express';
import { addProject } from '../controllers/projectController.js';
import { protect } from '../middlewares/authorization.js';
import multer from '../middlewares/multer.js';

const router = express.Router();

router
.route("/add/:id")
.post(protect,multer,addProject);




export default router;