import express from 'express'
import {getAccounts,createAccount,addMoneyToAccount} from '../controllers/accountController.js'

import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router.get("/:id?",authMiddleware,getAccounts)
router.post("/create",authMiddleware,createAccount)
router.post("/add-money/:id",authMiddleware,addMoneyToAccount)
// router.use("/transaction",transactionRoutes)


export default router;