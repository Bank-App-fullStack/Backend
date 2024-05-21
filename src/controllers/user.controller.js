const user = require("../schema/user.schema");

module.exports = {

    getUsers: async (req, res) => {
        try {

            if (req.userToken.admin != true) {
                return res.json({
                    code: 401,
                    message: "Unauthorized",
                });
            }

            const users = await user.find();
            if (users.length === 0) { 
                return res.status(404).json({
                    success: false,
                    message: "Users not found"
                });
            }

            return res.status(200).json({
                results: users,
                success: true
            });
        }

        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }

    },

    getUser: async (req, res) => { 
            const id = req.params.id;
            if (id !== req.userToken.id || req.userToken.admin != true) {
                return res.json({
                    code: 401,
                    message: "Unauthorized",
                });
            }
            try {
                
                if (id === null) {
                    return res.status(400).json({
                        success: false,
                        message: "Bad request. No id provided"
                    });
                }

                const users = await user.findById(String(id));
                
                if (!users) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found"
                    });
                }
                return res.status(200).json({
                    results: users,
                    success: true
                });
            }
    
            catch (err) {
                res.status(500).json({ 
                    sucess: false,
                    message: err.message 
                });
            }
    },

    deleteUser: async (req, res) => { 
        const id = req.params.id;
        if (id !== req.userToken.id || req.userToken.admin != true) {
            return res.json({
                code: 401,
                message: "Unauthorized",
            });
        }
        
        try {
            
            if (id === null) {
                return res.status(400).json({
                    success: false,
                    message: "Bad request. No id provided"
                });
            }

            const users = await user.deleteOne({ _id: id });
            
            if (!users) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                results: users,
                success: true
            });
        }

        catch (err) {
            // si une erreur se user, on renvoie un code 500 avec le message de l'erreur
            res.status(500).json({ 
                sucess: false,
                message: err.message 
            });
        }
    },

    updateUser: async (req, res) => { 
        const id = req.params.id;
        const body = req.body
        if (id !== req.userToken.id || req.userToken.admin != true) {
            return res.json({
                code: 401,
                message: "Unauthorized",
            });
        }
        try {
            
            if (id === null) {
                return res.status(400).json({
                    success: false,
                    message: "Bad request. No id provided"
                });
            }

            const users = await user.findByIdAndUpdate(id, body, {returnDocument: "after"});
            
            if (!users) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                results: users,
                success: true
            });
        }

        catch (err) {
            // si une erreur se user, on renvoie un code 500 avec le message de l'erreur
            res.status(500).json({ 
                sucess: false,
                message: err.message 
            });
        }
    }
}