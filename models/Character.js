import sequelize from "sequelize";
import db from "../config/db.js";
import Movie from "./movie.js";

const Character = db.define("Character", {
	image: {
		type: sequelize.STRING,
		allowNull: false,
	},
	name: {
		type: sequelize.STRING,
		allowNull: false,
	},
	age: {
		type: sequelize.INTEGER,
		allowNull: false,
	},
	peso: {
		type: sequelize.INTEGER,
		allowNull: false,
	},
	history: {
		type: sequelize.STRING,
		allowNull: false,
	},
});



export default Character;