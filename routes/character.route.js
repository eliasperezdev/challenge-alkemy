import {
    getCharacter,
    listCharacters,
    addCharacter,
    editCharacter,
    deleteCharacter
} from "../controllers/character.controller.js"

import {Router} from "express"
import checkAuth from "../middleware/checkAuth.js"


const router = Router()

router.get("/",checkAuth, listCharacters)
router.get("/:idCharacter",checkAuth, getCharacter)
router.post("/",checkAuth, addCharacter)
router.put("/:idCharacter",checkAuth, editCharacter)
router.delete("/:idCharacter",checkAuth, deleteCharacter)


export default router
