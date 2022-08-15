import { Op } from "sequelize"
import Character from "../models/Character.js"
import Gender from "../models/Gender.js"
import Movie from "../models/Movie.js"



const getMovie = async (req, res) => {
    const {idMovie} =  req.params

    const movie = await Movie.findOne({where:{id: idMovie}, include: Character})


    if(movie === null) {
        const error = new Error("Pelicula no encontrado")
        return res.status(404).json({ messaje: error.message})
    }

    try {
        res.status(200).json(movie)
    } catch (error) {
        console.log(error);
    }
}

const getMovies = async (req, res) => {


    const name = req.query.name || ""
    let order = req.query.order || "ASC"
    if(order!=="ASC" && order!=="DESC") {
        const error = new Error("Orden incorrecto")
        return res.status(404).json({ messaje: error.message})
    }
    const genreId = req.query.genre

    let movies
   
    if(genreId) {
        movies = await Movie.findAll({where:{title: {
            [Op.substring]: name
          }},
          attributes: ['id', 'title', 'image'],
          order: [['title', order]],
          include:{
            model: Gender,
            where:{
                id: genreId
            }
        }}
          )
    } else {
        movies = await Movie.findAll({where:{title: {
            [Op.substring]: name
          }},
          attributes: ['id', 'title', 'image'],
          order: [['title', order]]}
          )
    }



    if(movies.length === 0) {
        const error = new Error("No hay peliculas cargados")
        return res.status(404).json({ messaje: error.message})
    }

    res.json(movies)
}

const addMovie = async (req, res) => {
    const movie = req.body
    console.log(movie);
    
    if(movie.title==="" && movie.image==="" && movie.qualification==="" && movie.creation_date==="" && movie.gender==="" && movie.characters===""){
        const error = new Error("Todos los campos son requeridos")
        return res.status(400).json({ messaje: error.message})
    }

    const gender = await Gender.findOne({where: {id: movie.gender}}) 

    const characters = await Character.findAll({where: {id: movie.characters}}) 

    if(!gender) {
        const error = new Error("Genero inexistente")
        return res.status(400).json({ messaje: error.message})
    }

    if(!characters) {
        const error = new Error("PErsoajes inexistente")
        return res.status(400).json({ messaje: error.message})
    }


 
    try {
        const newMovie = await Movie.create(req.body)

        newMovie.addGender(
            movie.gender
        )

        newMovie.addCharacter(
            movie.characters
        )
        res.status(200).json(newMovie)
    } catch (error) {
        console.log(error);
    }
    

}

const editMovie = async (req, res) => {
    const {idMovie} =  req.params

    const movie = await Movie.update(req.body, {where:{id: idMovie}})

    if(movie[0]===0) {
        const error = new Error("No se pudo actualizar")
        return res.status(403).json({ message: error.message})
    } 
    const movieEdit = await Movie.findAll({where: {id: idMovie}})

    try {
        res.status(200).json(movieEdit)
    } catch (error) {
        console.log(error);
    }
}

const deleteMovie = async (req, res) => {
    const {idMovie} =  req.params

    const movie = await Movie.findOne({where:{id: idMovie}})

    if(movie === null) {
        const error = new Error("Pelicula no encontrado")
        return res.status(404).json({ messaje: error.message})
    }

    try {
        await Movie.destroy({where:{id:idMovie}})
        res.status(200).json({message:"Pelicula eliminada"})
    } catch (error) {
        console.log(error);
    }
}

export {
    getMovie,
    getMovies,
    addMovie,
    editMovie,
    deleteMovie
}