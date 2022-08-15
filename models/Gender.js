import sequelize from "sequelize";
import Movie from "./Movie.js";
import db from "../config/db.js";

const Gender = db.define("Gender", {
	name: {
		type: sequelize.STRING,
		allowNull: false,
	},
	image: {
		type: sequelize.STRING,
		allowNull: false,
	},
});




export default Gender;