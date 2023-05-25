const express = require('express');
const cors = require("cors"); 
const app = express();
const path = require('path');
const routes = require("./routes/intra");
const auth = require("./routes/auth");
const sessions = require('express-session');

// template engine
app.set('view engine', 'ejs');

app.use(cors())
app.use(sessions({
    secret: "secret",
    saveUninitialized:true,
    cookie: { maxAge: 5000000, secure: false },
    resave: false
}));
app.use(express.json());
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist/jquery.js')))

// routes dans le dossier routes, corps des fonctions dans le dossier controller
app.use('/api', routes); 
app.use('/', auth); 

// entrée du site
app.get('/', (req, res) => {
    res.redirect('/signin')
})

app.listen(8080, () => {
    console.log("app listening on port 8080 !")
})