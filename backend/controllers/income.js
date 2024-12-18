const incomeModel = require("../models/incomeModel")

exports.addIncome = async (req,res) => {
    const {title, amount, category, description, date} = req.body

    const income = incomeModel({
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
        
        await income.save()
        res.status(200).json({message: "Income Added"})
    }

    catch(error){
        res.status(500).json({error: "Server Error"})
    }

    console.log(income)
}


exports.getIncomes = async (req,res) => {
    try{
        const incomes = await incomeModel.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    }

    catch(error){
        res.status(500).json({error: "Server Error"})
    }
}

exports.deleteIncome = async (req,res) => {
    const id = req.params.id
   

    try{
        await incomeModel.findByIdAndDelete(id)
        res.status(200).json({message: "Income Deleted"})
    }

    catch(error){
        res.status(500).json({error: "Server Error"})
    }
}