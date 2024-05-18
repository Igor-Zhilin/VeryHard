const Sequelize = require("sequelize");

module.exports = (sequelizeMethod) => {
    const Catalog = sequelizeMethod.define(
        "Catalog",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            category: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            img_url: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            price: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            toggle: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
        },
        { timestamps: true }
    );
    return Catalog;
};
