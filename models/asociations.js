import Character from "./Character.js";
import Gender from "./Gender.js";
import Movie from "./Movie.js";



Movie.belongsToMany(Gender, { through: "Movie_Gender" });
Gender.belongsToMany(Movie, { through: "Movie_Gender" });
Movie.belongsToMany(Character, { through: "Movie_Character" });
Character.belongsToMany(Movie, { through: "Movie_Character" });

