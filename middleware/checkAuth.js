import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";
import 'dotenv/config'


const checkAuth = async (req, res, next) => {
    console.log(req.user);
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
                token = req.headers.authorization.split(' ')[1]
                console.log(token);

                const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
                req.user = await User.findOne({where:{email:decoded.email}})

                console.log(req.user);


            } catch (error) {
            return res.status(404).json({msg: "hubo un error"})
        }
    
        return next()
    }  
    if(!token ) {
        const error = new Error("Token no valido")
        return res.status(404).json({msg: error.message})
   
    }
}

export default checkAuth