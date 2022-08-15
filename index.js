import express from "express"
import dotenv from 'dotenv'
import db from './config/db.js'
import Movie from "./models/Movie.js"
import Gender from "./models/Gender.js"
import Character from "./models/Character.js"
import User from "./models/User.js"
import "./models/asociations.js"
import routerGender from "./routes/gender.route.js"
import routerCharacter from "./routes/character.route.js"
import routerMovie from "./routes/movie.route.js"
import routerUser from "./routes/user.route.js"


const app = express()
app.use(express.json())
dotenv.config()

//routes
app.use("/api/characters", routerCharacter);
app.use("/api/movies", routerMovie);
app.use("/api/genders", routerGender);
app.use("/api", routerUser);

const PORT = process.env.PORT || 4000

await db .sync({ force: false });

db.sync()
    .then(()=>console.log('DB Conectada'))
    .catch((error) => console.log(error));

app.listen(PORT,  ()=> {
    console.log(`Servidor corriendo en ${PORT}`);
})




