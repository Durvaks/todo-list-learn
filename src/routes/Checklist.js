const express = require('express')

const router = express.Router();

const Checklist = require('../models/checklist');


router.get("/", async (req, res) => {
    try{
        let checklist = await Checklist.find() //<=== Encontrar todos no banco de dados
        res.status(200).json(checklist)
    }catch(error){
        res.status(422).json(error)
    }
})

//ADICIONA UMA NOVA INFORMAÇÃO
router.post("/", async (req, res) => {
    let { name } = req.body;
    try {
        let checklist = await Checklist.create({ name }) //<=== Criar no banco de dados
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error)
    }
})


//RETORNA ALGUMA INFORMAÇÃO AO USUARIO
router.get("/:id", async (req, res) => {
    try{
        let checklist = await Checklist.findById(req.params.id); //<=== Encontrar por ID no banco de dados
        res.status(200).json(checklist);
    }catch(error){
        res.status(422).json(error);
    }

})


//ATUALIZA UM DADO PELO ID
router.put("/:id", async (req, res) => {
    let {name} = req.body;
    try{
        let checklist = await Checklist.findByIdAndUpdate(req.params.id, {name}); //<=== Encontrar e Atualizar  do banco de dados
        res.status(200).json(checklist);
    }catch(err){
        res.status(422).json(error);
    }
})

router.delete("/:id", async (req, res)=>{
    try{
        let checklist = await Checklist.findByIdAndDelete(req.params.id); //<=== Encontrar e Deletar do banco de dados
        res.status(200).json(checklist);
    }catch(error){
        res.status(422).json(error);
    }
})

module.exports = router;






















/*
const mongoose = require('mongoose')



const user_schema = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String
    }
)

const Users_db = mongoose.model("users_db", user_schema)

const database = express.Router();
database.use(express.json())

database.post("/",(req, res)=>{
    
    res.send("Tudo OK")
})


module.exports = database;
*/