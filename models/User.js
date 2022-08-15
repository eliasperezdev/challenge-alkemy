import sequelize from "sequelize";
import db from "../config/db.js";
import Movie from "./movie.js";

const User = db.define("User", {
	name: {
		type: sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: sequelize.STRING,
		allowNull: false,
	},
	password: {
		type: sequelize.STRING,
		allowNull: false,
	},
	token: {
		type: sequelize.STRING
	}
});

export default User
