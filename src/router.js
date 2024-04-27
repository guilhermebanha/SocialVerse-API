const express = require('express');
const fileupload = require('express-fileupload');
const crudController = require('./controllers/crudController');
const sessionController = require('./controllers/sessionController');



const router = express.Router();
router.use(fileupload({preserveExtension : true}));


// Primeiro chamamos o controller e depois o método. o controller que usa o model.

// CREATE
router.post('/upload', crudController.uploadPost);


// READ
router.get('/users', crudController.getAll);
router.get('/posts',crudController.getAllPosts);
router.get('/sendImage',crudController.sendImage);


// CÓDIGO OBSULETO
// router.get('/postlength',postController.getLength);

// DELETE
router.delete('/deletepost',crudController.deleteById);

// Session
router.get('/login', sessionController.login);
router.get('/register', sessionController.register);


module.exports = router;