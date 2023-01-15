import express from 'express';
import { acceptRdv, getAllRdv, getAllRdvAccepted, getAllRdvEnAttente, rejectRdv } from '../controllers/adminController.js';
import { admin, protect } from '../middlewares/authorization.js';


const router = express.Router();

router
.route("/getallrdv")
.get(protect,admin,getAllRdv);

router
.route("/rdvlist")
.get(protect,admin,getAllRdvEnAttente);

router
.route("/acceptedrdv")
.get(protect,admin,getAllRdvAccepted);

router
.route("/accepted/:_id")
.put(protect,admin,acceptRdv);

router
.route("/rejected/:_id")
.put(protect,admin,rejectRdv);

export default router;