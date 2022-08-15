import Sequelize from "sequelize"

const db = new Sequelize('backend-alkemy','postgres','root',{
    host:'127.0.0.1',
    port: '5432',
    dialect: 'postgres',
    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle:10000
    },
    logging: false
})

export default db