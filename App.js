const express = require('express');
const path = require('path')
const checklistRouter = require('./src/routes/Checklist');
const rootRouter = require('./src/routes/index');
const methodOverride = require('method-override');

require('./Config/Database');

const app = express();
app.use(methodOverride('_method', {methods:['POST', 'GET']}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'Public')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');


app.use("/checklists", checklistRouter);
app.use("/", rootRouter)

app.listen(3000, ()=>{
    console.log("o servidor foi iniciado");
});