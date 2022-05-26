const userSchema = require('../models/user.model');
const roleSchema = require('../models/role.model');
const bcrypt = require('bcrypt')

exports.addUser = async (req,res) =>{
    const {email,password,role} = req.body;

    try {
        const userExist = await userSchema.findOne({email:email});
        if(userExist){
            return res.status(400).send({msg:'User already exist...'});
        }
        const newUser = new userSchema(req.body);
        
        if(req.body.role){
            if(req.body.role == 'admin' || req.body.role == 'gestionnaire'){
                const userRole = await roleSchema.findOne({roleName:'user'})
                newUser.role = userRole._id
            }
        }else{
            const userRole = await roleSchema.findOne({roleName:'user'})
            newUser.role = userRole._id
        }
        const passwordHasher = bcrypt.hashSync(password,10);
        newUser.password = passwordHasher;
        await newUser.save();
        return res.status(200).send({msg:'User add successfully'});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}
exports.getUsers = async (req,res) =>{
    
    try {
        const users = await userSchema.find()
        return res.status(200).send({users});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}
exports.getOneUser = async (req,res) =>{
    const {id} = req.params
    try {
        const user = await userSchema.findById(id);
        if(!user){
            return res.status(404).send({msg:'user not exist...'})
        }
        return res.status(200).send({user});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}
exports.deleteOneUser = async (req,res) =>{
    const {id} = req.params
    try {
        await userSchema.findByIdAndDelete(id)
        return res.status(200).send({msg:'user deleted successfully'});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}