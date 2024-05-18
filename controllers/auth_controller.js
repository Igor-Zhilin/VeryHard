const { Catalog, Users } = require("../models/config");
const index_controller = require("./index_controller");
const session_controller = require("./session_controller");
const bcrypt = require("bcrypt");

const auth_controller = async (req, res) => {
    const usercheck = await session_controller.check_session_controller(
        req,
        res
    );
    const page = "auth";
    const msg = false;
    const allData = { usercheck, msg };
    const user = await session_controller.check_session_controller(req, res);
    console.log(user);
    res.render(page, allData);
};

const auth_post_controller = async (req, res) => {
    const usercheck = await session_controller.check_session_controller(
        req,
        res
    );
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email } });
        // if (!user) {
        //     const page = "auth";
        //     const msg = true;
        //     const allData = { usercheck, msg };
        //     res.render(page, allData);
        // }
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            req.session.email = email;
            index_controller.catalog_controller(req, res);
        } else {
            const page = "auth";
            const msg = true;
            const allData = { usercheck, msg };
            res.render(page, allData);
        }
    } catch (err) {
        const page = "auth";
        const msg = true;
        const allData = { usercheck, msg };
        res.render(page, allData);
    }
};

const login_controller = async (req, res) => {
    const usercheck = await session_controller.check_session_controller(
        req,
        res
    );
    const page = "auth";
    const allData = { usercheck };
    res.render(page, allData);
};
const reg_controller = async (req, res) => {
    const usercheck = await session_controller.check_session_controller(
        req,
        res
    );
    const page = "reg";
    const msg = false;
    const msg2 = false;

    const allData = { usercheck, msg, msg2 };
    res.render(page, allData);
};
const post_reg_controller = async (req, res) => {
    const usercheck = await session_controller.check_session_controller(
        req,
        res
    );

    const { name, surname, patronymic, email, password } = req.body;
    if (password[0] == password[1]) {
        try {
            const user = await Users.create({
                name,
                surname,
                patronymic,
                email,
                password: password[0],
            });
            req.session.email = email;
            index_controller.catalog_controller(req, res);
        } catch (err) {
            const page = "reg";
            const msg = false;
            const msg2 = true;
            const allData = { usercheck, msg2, msg };
            res.render(page, allData);
        }
    } else {
        const page = "reg";
        const msg = true;
        const msg2 = false;
        const allData = { usercheck, msg2, msg };
        res.render(page, allData);
    }
};
const logout_post_controller = async (req, res) => {
    req.session.email = null;
    auth_controller(req, res);
};

module.exports = {
    auth_controller,
    login_controller,
    reg_controller,
    post_reg_controller,
    auth_post_controller,
    logout_post_controller,
};
