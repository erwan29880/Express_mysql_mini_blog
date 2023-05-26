const express = require('express');
const db = require('../db/req');

// middleware appelé en ajax pour insertion nom, prénom, message
// et renvoie l'ensemble des messages pour mettre à jour l'affichage front
exports.indexPostNomPrenom = (req, res, next) => {
    const mess = new db();
    mess.insertNomPrenom(req.body);
    mess.getNames()
    .then(rep => {
        res.status(201).json({message : rep})
    })
};

// suppression des entrées bdd par nom
exports.deleteNom = (req, res, next) => {
    const mess = new db();
    mess.deleteNomPrenom(req.params.id)
    .then(() => {
        mess.getNames()
        .then(rep => {
            res.status(201).json({message : rep})
        })
    })   
};

// update blog 
// première connection à la page /api
exports.updateBlog = (request, response, next) => {
    const nbrMessages = parseInt(request.params.id);
    const mess = new db();
    mess.getNames()
    .then(res => {
        if (res.length != nbrMessages) {
            response.status(201).json({ message : res });
            next()
        } else {
            response.status(200).json({ message: "nochange"});
            next()
        }
    })
    .catch((error) => {response.status(500).json({ error })}); 
};

// première connection à la page /api
exports.index = (request, response) => {
    const mess = new db();
    mess.getNames()
    .then(res => response.render('pages/index', {message: res}))
    .catch((error) => {response.status(500).json({ error })}); 
};
