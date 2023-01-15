import express from 'express';
import { createPortfolio, getallPortfolio, getMyOwnerPortfolio, updateMyPortfolio } from '../controllers/portfolioController.js';
import { protect } from '../middlewares/authorization.js';

const router = express.Router();

router
.route("/addportfolio")
.post(protect,createPortfolio);

router
.route("/getmyportfolio")
.get(protect,getMyOwnerPortfolio);

router
.route("/getall")
.get(protect,getallPortfolio);

router
.route("/edit/:_id")
.put(protect,updateMyPortfolio);



export default router;