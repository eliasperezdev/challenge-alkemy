import sequelize from "sequelize";
import db from "../config/db.js";
import Character from "./Character.js";
import Gender from "./Gender.js";

const Movie = db.define("Movie", {
	image: {
		type: sequelize.STRING,
		allowNull: false,
	},
	title: {
		type: sequelize.STRING,
		allowNull: false,
	},
	creation_date: {
		type: sequelize.DATE,
	},
	qualification: {
		type: sequelize.INTEGER,
		allowNull: false,
		validate:{
			min:1,
			max: 5
		}
	},
});




export default Movie;