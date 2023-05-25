const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/req');

// première connection à la page /signin  -> enregistrement nouvel utilisateur
exports.signIn = (req, res, next) => {
    res.render('pages/signin', {message : ""});
    next();
};

// /signin -> post -> entrée (éventuelle) d'un nouvel utilisateur en bdd
exports.signInPost = (req, res, next) => {
    if (req.body.nom !== undefined && req.body.password !== undefined) {
        const testRe = new RegExp("[^A-Za-zéèïô]+")
        if (testRe.test(req.body.nom) == false) {
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const dbb = new db();
                dbb.checkUser(req.body.nom)
                .then((rep) => {
                    if (rep === false) {
                        dbb.insertUser([req.body.nom, hash]);     
                        res.render('pages/login', {message : "vous avez été enregistré avec succès !"});
                    } else {
                        res.render('pages/signin', {message : "problème dans le nom ou le mot de passe !"})                
                    }
                });
            });
        } else {
            res.render('pages/signin', {message : "problème dans le nom ou le mot de passe !"})    
        }
    } else {
        res.render('pages/signin', {message : "utilisateur déjà enregistré !"})
    }
};

// affichage page de connection
exports.logIn = (req, res, next) => {
    res.render('pages/login', {message : ""});
    next();
};

// /login -> post -> vérification utilisateur, démarrage session
exports.logInPost = (req, res, next) => {
    if (req.body.nom !== undefined && req.body.password !== undefined) {
        const bdd = new db();
        const rep = bdd.checkUserPwd({
                nom : req.body.nom,
                password : req.body.password
        }).then(val => {
            if (val.length === 0) {
                res.render('pages/login', {message : "user/pwd incorrect"});
            } else {
                bcrypt.compare(req.body.password, val.password)
                .then(valid => {
                    if (!valid) {
                        res.render('pages/login', {message : "user/pwd incorrect"});        
                    } else {
                        req.session.userid = req.body.nom;
                        res.render('pages/login', {message : "user/pwd correct"});
                    }
                })
            }    
        })
    } else {
        res.render('pages/login', {message : "user/pwd incorrect"});
    }
};

// supprimer la session
exports.logOut = (req, res, next) => {
    req.session.destroy((err) => {
       console.log("session destroyed");  
    });
    res.redirect('/signin');  
};

// vérification session
exports.gestionSession = (req, res, next) => {
   if (req.session.userid) {
    next();
   } else {
    res.redirect('/signin')
   }
};