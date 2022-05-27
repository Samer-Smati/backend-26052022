const userSchema = require('../models/user.model')
const roleSchema = require('../models/role.model')
const bcrypt = require('bcrypt');



exports.addUser = async(req,res) =>{
    const {email,password,role} = req.body;
    try {
        const userExist = await userSchema.findOne({email:email});
        if(userExist){
            return res.status(400).send({msg:'User already exist...'});
        }
        const user = new userSchema(req.body);
        const passwordHashed = bcrypt.hashSync(password,10);
        user.password = passwordHashed
        
        if(req.body.role){
            if(role != 'admin' || role != 'gestionnaire'){
                const ourRole = await roleSchema.findOne({roleName:'user'});
                user.role = ourRole._id 
            }
        }else{
            const ourRole = await roleSchema.findOne({roleName:'user'});
            user.role = ourRole._id 
        }

        await user.save()
        return res.status(200).send({msg:'User added',user});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}



exports.getAllUsers = async(req,res) =>{
    try {
        const users = await userSchema.find();
        if(users.length == 0){
            return res.status(400).send({msg:'collect user empty...'});
        }
        
        return res.status(200).send({users});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}



exports.getOneUser = async(req,res) =>{
    const {id} = req.params;
    try {
        const user = await userSchema.findById(id);
        if(!user){
            return res.status(400).send({msg:'User not exist...'});
        }
        
        return res.status(200).send({user});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}


exports.deleteOneUser = async(req,res) =>{
    const {id} = req.params;
    console.log(id)
    try {
        const user = await userSchema.findByIdAndDelete(id);
        if(!user){
            return res.status(400).send({msg:'User not exist...'});
        }
        return res.status(200).send({msg:'User deleted'});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

