const express = require('express');

const router = express.Router();

const Checklist = require('../models/checklist');

router.get("/", async (req, res) => {
    try{
        let checklist = await Checklist.find() //<=== Encontrar todos no banco de dados
        res.status(200).render('checklists/index', {checklists: checklist})
    }catch(error){
        res.status(422).render('pages/error', {error: 'Erro ao exibir as listas'});
    }
})

//ADICIONA UMA NOVA INFORMAÇÃO
router.post("/", async (req, res) => {
    let { name } = req.body.checklist;
    try {
        await Checklist.create({ name }) //<=== Criar no banco de dados
        res.redirect('/checklists')
    } catch (error) {
        res.status(500).render('checklists/new', { checklists: {...checklist, error}});
    }
})

router.get("/new", async(req, res)=>{
    try{
        let checklist = new Checklist();
        res.status(200).render('checklists/new', {checklist: checklist})
    }catch(error){
        res.status(500).render('pages/error', {errors: 'erro ao carregar um formulario'})
    }
    
})


//RETORNA ALGUMA INFORMAÇÃO AO USUARIO
router.get("/:id", async (req, res) => {
    try{
        let checklist = await Checklist.findById(req.params.id).populate('tasks');
        res.status(200).render("checklists/show", {checklist: checklist});
    }catch(error){
        res.status(422).render('pages/error', {error: 'Erro ao exibir as listas'});
    }

})

router.get('/:id/edit', async(req, res)=>{
    try{
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', {checklist: checklist})
    }catch{
        res.status(422).render('pages/error', {error: 'Erro ao exibir as listas'});
    }
})


//ATUALIZA UM DADO PELO ID
router.put('/:id', async (req, res) => {
    let {name} = req.body.checklist;
    let checklist = await Checklist.findById(req.params.id); 
    try{
        await checklist.updateOne({name});
        res.redirect('/checklists');
    }catch(error){
        console.log(error)
        let errors = error.erros
        res.status(422).render('checklists/edit', {checklist: {...checklist, errors}})
    }
});

router.delete("/:id", async (req, res)=>{
    try{
        let checklist = await Checklist.findByIdAndDelete(req.params.id); //<=== Encontrar e Deletar do banco de dados
        res.redirect('/checklists');
    }catch(error){
        res.status(500).render('/pages/error', {error: 'erro ao deletar a lista de tarefas'});
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