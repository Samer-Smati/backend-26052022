const express = require('express');


const userRoutes = express.Router();

const {addUser,getAllUsers,getOneUser,deleteOneUser} = require('../controllers/user.controller')


userRoutes.post('/addUser',addUser);
userRoutes.get('/',getAllUsers);
userRoutes.get('/:id',getOneUser);
userRoutes.delete('/:id',deleteOneUser);
// userRoutes.put('/:id',deleteOneUser);




module.exports = userRoutes;