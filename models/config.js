const Sequelize = require("sequelize");
const ModelCatalog = require("./catalog.js");
const ModelUsers = require("./users.js");
const ModelCart = require("./cart.js");
const SequelizeCreate = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite3",
    logging: false,
});
const Catalog = ModelCatalog(SequelizeCreate);
const Users = ModelUsers(SequelizeCreate);
const Cart = ModelCart(SequelizeCreate);

module.exports = { SequelizeCreate, Catalog, Users, Cart };
