import {
    getMovie,
    getMovies,
    addMovie,
    editMovie,
    deleteMovie
} from "../controllers/movie.controller.js"

import {Router} from "express"
import checkAuth from "../middleware/checkAuth.js"

const router = Router()

router.get("/",checkAuth, getMovies)
router.get("/:idMovie",checkAuth, getMovie)
router.post("/",checkAuth, addMovie)
router.put("/:idMovie",checkAuth, editMovie)
router.delete("/:idMovie",checkAuth, deleteMovie)


export default router