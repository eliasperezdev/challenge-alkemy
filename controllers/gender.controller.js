import Gender from "../models/Gender.js"

const getGenders = async (req, res) => {
    const genders = await Gender.findAll({attributes: ['id', 'name', 'image']})

    if(genders.length === 0) {
        const error = new Error("No hay generos cargados")
        return res.status(404).json({ messaje: error.message})
    }

    res.json(genders)
}

const addGender = async (req, res) => {
    const gender = req.body
    
    if(gender.name==="" && gender.image==="" ){
        const error = new Error("Todos los campos son requeridos")
        return res.status(400).json({ messaje: error.message})
    }

    try {
        const newGender = await Gender.create(req.body)
        res.status(200).json(newGender)
    } catch (error) {
        console.log(error);
    }
    

}

const editGender = async (req, res) => {
    const {idGender} =  req.params

    const gender = await Gender.update(req.body, {where:{id: idGender}})

    if(gender[0]===0) {
        const error = new Error("No se pudo actualizar")
        return res.status(403).json({ message: error.message})
    } 
    const genderEdit = await Gender.findAll({where: {id: idGender}})

    try {
        res.status(200).json(genderEdit)
    } catch (error) {
        console.log(error);
    }
}

const deleteGender = async (req, res) => {
    const {idGender} =  req.params

    const gender = await Gender.findOne({where:{id: idGender}})

    if(gender === null) {
        const error = new Error("Género no encontrado")
        return res.status(404).json({ messaje: error.message})
    }

    try {
        await Gender.destroy({where:{id:idGender}})
        res.status(200).json({message:"Género eliminada"})
    } catch (error) {
        console.log(error);
    }
}

export {
    getGenders,
    addGender,
    editGender,
    deleteGender
}