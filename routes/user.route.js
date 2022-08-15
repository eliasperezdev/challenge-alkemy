import {check } from "express-validator" 
import { authenticatedUser, authenticateUser, newUser } from '../controllers/user.controller.js'

import {Router} from "express"

import auth from '../middleware/checkAuth.js'

const router = Router()
router.post('/login', 
[
    check('email', 'Agregue un email válido').isEmail(),
    check('password', 'El password no puede ser vacio').isLength({min: 6}),
], authenticateUser
)

router.post('/register', 
[
    check('name', 'El nombre es obligatiorio').not().isEmpty(),
    check('email', 'Agregue un email válido').isEmail(),
    check('password', 'El password debe ser de al menos 6 digitos').isLength({min: 6}),
],
newUser)

router.get('/', 
    auth,
    authenticatedUser)


export default router