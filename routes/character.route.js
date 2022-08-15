import {
    getCharacter,
    listCharacters,
    addCharacter,
    editCharacter,
    deleteCharacter
} from "../controllers/character.controller.js"

import {Router} from "express"

const router = Router()

router.get("/", listCharacters)
router.get("/:idCharacter", getCharacter)
router.post("/", addCharacter)
router.put("/:idCharacter", editCharacter)
router.delete("/:idCharacter", deleteCharacter)


export default router
