const user = require("../schema/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async(req, res, next) => {
    const { mail, password } = req.body;
    console.log(mail+" "+password)
    if(!mail || !password){
        return res.json({
            message: "Missing email or password",
            code: 400,
            succes: false
        })
    }

    try {
        const users = await user.findOne({ mail })
        console.log(users._id)
        if(!users) {
            return res.json({
                message: "User not found",
                code: 401,
                succes: false
            })
        }

        const passwordMatch = await bcrypt.compare(password, users.password);
        if (!passwordMatch) {
            return res.json({
                message: "Incorrect password",
                code: 401,
                succes: false
            })
        }

        const token = jwt.sign(
            {
                id: users._id,
                admin: users.admin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "365d" }
        );
        console.log(token)

        return res.json({
            message: "Login succesful",
            code: 200,
            succes: true,
            token: token,
        })

    } catch(error) {
        return res.json({
            message: error.message,
            code: 500,
            succes: false
        })

    }
    
}