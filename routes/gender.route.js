import {
    getGenders,
    addGender,
    editGender,
    deleteGender
} from "../controllers/gender.controller.js"

import {Router} from "express"
import checkAuth from "../middleware/checkAuth.js"


const router = Router()

router.get("/",checkAuth, getGenders)
router.post("/",checkAuth, addGender)
router.put("/:idGender",checkAuth, editGender)
router.delete("/:idGender",checkAuth, deleteGender)


export default router
