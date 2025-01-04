import {getMonthName} from "../libs/index.js"
import {pool} from "../libs/database.js"
export const getTranscations=async (req,res)=>{
    try {
        const today = new Date();
        const _sevenDaysAgo = new Date(today)
        _sevenDaysAgo.setDate(_sevenDaysAgo.getDate() - 7);//transction for 7 days
        
        const sevenDaysAgo = _sevenDaysAgo.toISOString().split('T')[0];
        const{df,dt,s}=req.query;

        const{userId} = req.body.userId
        const startDate = new Date (df||sevenDaysAgo)
        const endDate = new Date (df||newDate());

        const transactions = await pool.query({
            text:`SELECT * FROM tbltranscation WHERE user_id = $1 AND createdat BETWEEN $2 and $3 AND (description ILIKE '%'||$4||'%' OR status ILIKE '%'||$4||'%' OR source ILIKE '%'||$4||'%') ORDER BY id DESC`,
            values:[userId,startDate,endDate,s],
        })

        res.status(200).json({
            status:"success",
            data:transactions.rows,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"failed",
            message:error.message
        })
        
        
    }
}
export const getDashboardInformation=async (req,res)=>{
    try {
        const{userId}= req.body.user;
        let totalIncome=0
        let totalExpense=0
        const transactionsResult = await pool.query({
            text:`SELECT type,SUM(amount) AS totalAmount FROM tbltranscation where user_id=$1 GROUP BY type`,
            values:[userId],
        })
        const transactions = transactionsResult.rows;
        transactions.forEach((transaction)=>{

            if(transaction.type==="income"){
                totalIncome+=transaction.totalAmount
            }else{
                totalExpense+=transaction.totalAmount
            }
        })

        const availableBalance = totalIncome-totalExpense;

        //Aggregate transactions to sum by typoe and group by month
        const year = new Date().getFullYear();
        const start_Date = new Date(year,0,1)//january 1st of the year
        const end_Date = new Date(year,11,31,23,59,59)//December 31st of the year
        
        const result = await pool.query({
            text:`SELECT EXTRACT(MONTH FROM createdat) AS month,SUM(amount)
            AS totalAmount FROM tbltransaction,WHERE user_id = $1 AND createdat BETWEEN $2 and $3 GROUP BY EXTRACT(MONTH FROM createdat),type`,
            values:[userId,start_Date,end_Date],
        })
        //organise datat
        const data = new Array(12).fill().map((_,index)=>{
            const monthData = result.rows.filter((item)=>parseInt(item.month)==index+1)
            const income = monthData.find((item)=>item.type==="income")?.totalAmount||0
                const expense = monthData.find((item)=>item.type==="expense")?.totalAmount||0;
                return{
                    label:getMonthName(index),
                    income,
                    expense,
                }
        })        
        // FETCh the last tranascations
        const lastTransactions = await pool.query({
            text:`SELECT * FROM tbltransaction WHERE user_id=$1 ORDER BY id DESC LIMIT 5`
            ,values:[userId]
            })
            const lastTransactionsData = lastTransactions.rows;

        // FETCh the last tranascations
        const lastAccountResult = await pool.query({
            text:`SELECT * FROM tbltransaction WHERE user_id=$1 ORDER BY id DESC LIMIT 4`
            ,values:[userId]
            })
            const lastAccount = lastAccountResult.rows;

            res.status(200).json({
                status:"success",
                availableBalance,
                totalIncome,
                totalExpense,
                chartData:data,
                lastTransactions,
                lastAccount,
            })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"failed",
            message:error.message
        })
        
        
    }
}
export const addTransaction=async (req,res)=>{
    try {
        const{userId}=req.body.user
        const{account_id}=req.params
        const{description,amount,source}=req.body;

        if(!description||source||amount){

            return res.status(403).json({
                status:"failed",
                message:"Please Required fields!"
            })
        }

        if(Number(amount)<=0)
            return res.status(403).json({
        status:"failed",
    message:"Amount should be greater than 0"
})

    const result = await pool.query({
        text:`SELECT *FROM tbl account WHERE id = $1`,
        values:[account_id],
    })
    const accountInfo = result.rows[0];

    if(!accountInfo){
        return res.status(404).json({
            status:"failed",
            message:"Invalid Accoun Information"

    })
}
    if(
        accountInfo.account_balance<=0||
        accountInfo.account_balance<Number(amount)
        
    ){
return res.status(403).json({
    status:"failed",
    message:"Transaction failed.Insufficient Balance"
})
    }
    //BEgin Transaction
await pool.query("BEGIN");
await pool.query({
    text:`UPDATE tbl_account SET account_balance = account_balance - $1,updateat=CURRENT_TIMESTAMP WHERE id = $2`,
    values:[amount,account_id]
})
await pool.query({
    text:`INSERT INTo tbltransaction(user_id,description, type,status,amount,source) VALUE($1,$2,$3,$4,$5,$6)`,
    values:[userId,description,"expense","Completed",amount,source],
})

await pool.query("COMMIT");
res.status(200).json({
    status:"success",
    message:"Transcation completed successfully"
})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"failed",
            message:error.message
        })
        
        
    }
}
export const transferMoneyToAccount=async (req,res)=>{
    try {
        const {userId} = req.body.user;
        const {from_account,to_account,amount} = req.body;

        if(!(from_account||to_account||amount)){
            return res.status(403).json({
                status:"failed",
                message:"Please provide all required fields"
                })
        }
        const newAmount = Number(amount);
        if(newAmount<=0){
            return res.status(403).json({
                status:"failed",
                message:"Amount should be greater than 0"
                })
            }
            const fromAccountResult = await pool.query({
                text:`SELECT * FROM tbl_account WHERE id = $1`,
                values : [from_account],
    });
   const fromAccount = fromAccountResult.rows[0];
   if(!fromAccount){
    return res.status(404).json({
        status:"failed",
        message:"Account information not found"
        })
        }
//    if(fromAccount.account_balance < newAmount){
    if(newAmount>fromAccount.account_balance){

    return res.status(403).json({
        status:"failed",
        message:"Transfer failed.Insufficient balance"
        })
        }
        
        //Begin transcation
        await pool.query("BEGIN")

        //transfer from account
       
await pool.query({
    text:`UPDATE tblaccount SET account_balance = account_balance - $1,updateat=CURRENT_TIMESTAMP WHERE id = $2,`,
    values : [newAmount,from_account],
    });
        //transfer to account
       
const toAccount = await pool.query({
    text:`UPDATE tblaccount SET account_balance = account_balance + $1,updateat=CURRENT_TIMESTAMP WHERE id = $2,`,
    values : [newAmount,to_account],
    });

    //insert transction records
    const description = `Transfer (${fromAccount.account_name}-${toAccount.rows[0].account_name})`;
    
    await pool.query({
        text:`INSERT INTO tbl_transaction (account_id,amount,description,updateat) VALUES ($1,$2,$3,$4,$5,$6)`,
        values:[
            userId,
            amount,
            description,
            "expense",
            "Completed",
            fromAccount.account_name,

        ]
    })

    const description1 = `Received (${fromAccount.account_name}-${toAccount.rows[0].account_name})`;
    
    await pool.query({
        text:`INSERT INTO tbl_transaction (user_id,type,status,amount,source) VALUES ($1,$2,$3,$4,$5,$6)`,
        values:[
            userId,
            amount,
            description,
            "expense",
            "Completed",
            toAccount.rows[0].account_name,

        ]
    })
    //commit transaction
    await pool.query("COMMIT")
    res.status(201).json({
        status:"success",
        message:"Transaction completed successfully"
    })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"failed",
            message:error.message
        })
        
        
    }
}