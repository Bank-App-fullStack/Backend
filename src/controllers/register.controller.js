const user =  require('../schema/user.schema');
const senderEmail = require("../brevo/emailSender.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

exports.register = async(req, res, next) => {
    const { firstname, lastname, mail, password } = req.body;
    console.log("firstname: "+firstname+" lastname: "+lastname+" mail: "+mail+" password: "+password);
    if(
        !firstname || 
        !lastname || 
        !mail || 
        !password
    ){
        return res.status(400).json({
            succes: false,
            message: "Missing required fields"
        })
    }

    try {

        const existingUserByEmail = await user.findOne({ mail });
        if (existingUserByEmail) {
            return res.status(409).json({
                message: "email already exists",
                data: mail,
            })
        }

        const newUser = await user.create({
            firstname,
            lastname,
            mail,
            password: await hashPassword(password)
        });
        senderEmail(newUser);
        
        res.status(200).json({
            message: "User resgistered successfully",
            data: newUser,
        })

    } catch(error){
        return res.status(500).json({
            succes: false,
            message: error.message
        })
    }

}