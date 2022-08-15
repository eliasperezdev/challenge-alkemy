import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { validationResult } from 'express-validator';
import sgMail from '../senvices/sendgrid.js';

const authenticateUser  = async (req, res, next) => {
    console.log(req.body);
    // Buscar el user para ver si esta registrado
    const { email, password } = req.body;
    const user = await User.findOne({where:{ email: email }});

    if(!user) {
        res.status(401).json({msg : 'El usuario no existe'});
        return next();
    } 
    console.log(user);

    // Verificar el password y autenticar el user

    if(bcrypt.compareSync(password, user.password )) {
        // Crear JWT
        const token = jwt.sign({
            id: user._id,
            nombre: user.name,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: '8h'
        }  );

        console.log(token);

        res.json({ token })

    } else {
        res.status(401).json({msg: "Password Incorrecto"});
        return next();
    }

    
}

const authenticatedUser = (req, res, next) => {
    res.json({user: req.user } );
}

const newUser = async (req, res) => {

    //mostrar mensajes de erores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Verificar si el usuario esta registrado
    const { name, email, password } = req.body

    let user = await User.findOne({where:{email:email}})

    if(user) {
        return res.status(400).json({msg: "El usuario ya esta registrado"})
    }
    //Crear usaurio
    user = User.build(req.body)



    //Hashear password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    console.log(user);
    try {   
        const newUser = await user.save()
        const message = {
            to: newUser.email,
            from: "eliasperex@hotmail.com",
            subject: "Bienvenido a Disney API",
            text:"Bienvenidos",
            html:`<h4> Bienvenido ${newUser.name} </h4>
            <p> Se ha registrado exitosamente a la API de disney para el challenge de Alkemy </p>
            <br>
            <p>Creador: Perez Elias Daniel</p>`
        }
        await sgMail.send(message)

        res.json(newUser)
    } catch (error) {
        console.log(error);
    }

}

export {
    authenticateUser,
    authenticatedUser,
    newUser
}