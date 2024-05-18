const Sequelize = require("sequelize");

const bcrypt = require("bcrypt");

module.exports = (sequelizeMethod) => {
    const User = sequelizeMethod.define("User", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        patronymic: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        cart: {
            type: Sequelize.STRING,
        },
    });

    // Хеширование пароля перед сохранением в базу данных
    User.beforeCreate(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    });

    return User;
};
