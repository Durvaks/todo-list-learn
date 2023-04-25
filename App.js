const express = require('express');
const index = require('./Router/index');

const app = express();
app.listen(3000, ()=>{
    console.log("o servidor foi iniciado");
})

app.get('/',(req, res)=>{ 
    res.send('<h1>Testanto o Express :D</h1>');
})

app.get('/json',(req, res)=>{
    res.json({title: "Tarefa X", done: true});
})

