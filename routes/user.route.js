const express = require('express');

const userRoutes = express.Router();
const {addUser,getUsers,getOneUser,deleteOneUser} = require('../controllers/user.controller')

userRoutes.post('/add',addUser);
userRoutes.get('/',getUsers);
userRoutes.get('/:id',getOneUser);
userRoutes.delete('/:id',deleteOneUser);



module.exports = userRoutes;