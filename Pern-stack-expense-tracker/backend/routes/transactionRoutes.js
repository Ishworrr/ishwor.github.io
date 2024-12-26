import express from 'express'

import {addTransaction, getDashboardInformation, getTranscations, transferMoneyToAccount} from "../controllers/transactionController.js"
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router.get("/",authMiddleware,getTranscations)
router.get("/dashboard",authMiddleware,getDashboardInformation)
router.post("/add-transaction/:account_id",authMiddleware,addTransaction)
router.put("/transfer-money",authMiddleware,transferMoneyToAccount)


export default router;