const Sequelize = require("sequelize");

module.exports = (sequelizeMethod) => {
    const Cart = sequelizeMethod.define(
        "Cart",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email_user: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            id_item: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            price: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        },
        { timestamps: true }
    );
    return Cart;
};
