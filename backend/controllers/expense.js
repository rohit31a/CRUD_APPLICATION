const expenseModel = require("../models/expenseModel")

exports.addExpense = async (req,res) => {
    const {title, amount, category, description, date} = req.body

    const expense = expenseModel({
        title,
        amount,
        category,
        description,
        date
    })

    try{
        // validation
        if(!title || !category || !description || !date){
            return res.status(400).json({error: "All fields are required"})
        }

        if(amount <= 0 || amount === 'number'){
            return res.status(400).json({error: "Amount must be a positive number"})
        }
        
        await expense.save()
        res.status(200).json({message: "Expense Added"})
    }

    catch(error){
        res.status(500).json({error: "Server Error"})
    }

    console.log(expense)
}


exports.getExpenses = async (req,res) => {
    try{
        const expenses = await expenseModel.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    }

    catch(error){
        res.status(500).json({error: "Server Error"})
    }
}

exports.deleteExpense = async (req,res) => {
    const id = req.params.id
   

    try{
        await expenseModel.findByIdAndDelete(id)
        res.status(200).json({message: "Expense Deleted"})
    }

    catch(error){
        res.status(500).json({error: "Server Error"})
    }
}