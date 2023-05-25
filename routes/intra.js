const express = require('express');
const controller = require('../controller/intra');
const controllerAuth = require('../controller/auth');
const router = express.Router();

// routes pour le blog, quand l'utilisateur est connecté

router.post('/', controllerAuth.gestionSession, controller.indexPostNomPrenom);
router.delete('/:id', controllerAuth.gestionSession, controller.deleteNom)
router.get('/', controllerAuth.gestionSession, controller.index);

// pour tests sans le middleware de session
// router.post('/', controller.indexPostNomPrenom);
// router.delete('/:id', controller.deleteNom)
// router.get('/', controller.index);

module.exports = router;
