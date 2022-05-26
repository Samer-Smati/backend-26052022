const roleSchema = require('../models/role.model');
const userSchema = require('../models/user.model');
const bcrypt = require('bcrypt')
const init = async() =>{
    try {
        const roleIsEmpty = await roleSchema.find();
        if(roleIsEmpty.length == 0){
            await roleSchema.insertMany([{roleName:'admin'},{roleName:'gestionnaire'},{roleName:'user'}])
            console.log('admin , gestionnaire and user added succssefully...')
        }
        const adminRole = await roleSchema.findOne({roleName:'admin'});
        if(!adminRole){
            await roleSchema.insertMany([{roleName:'admin'},{roleName:'gestionnaire'},{roleName:'user'}])
            console.log('admin , gestionnaire and user added succssefully...')
        }
        const isAdminExist = await userSchema.findOne({role:adminRole._id})

        if(!isAdminExist){
            const isAdmin = new userSchema({
                firstname:'admin',
                lastname:'admin',
                email:'admin@admin.com',
                password:bcrypt.hashSync('123456789',10),
                role:adminRole._id,
                
            })
            await isAdmin.save();
            console.log("admin added to user collection")
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = init