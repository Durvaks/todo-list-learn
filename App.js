const express = require('express');
const checklistRouter = require('./src/routes/Checklist');
require('./Config/Database');

const app = express();
app.use(express.json());

app.listen(3000, ()=>{
    console.log("o servidor foi iniciado");
});

app.use("/checklists", checklistRouter);
