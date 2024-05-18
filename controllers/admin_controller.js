const { Catalog, Cart, Users } = require("../models/config");
const session_controller = require("./session_controller");
const index_controller = require("./index_controller");
const check_admin = async (req, res) => {
    if (req.session.email == "admin@admin") {
        return;
    } else {
        index_controller.index_controller(req, res);
    }
};

const admin_controller = async (req, res) => {
    check_admin(req, res);
    const usercheck = await session_controller.check_session_controller(
        req,
        res
    );

    const page = "admin";
    const data = await Catalog.findAll({ raw: true });
    const dataCart = await Cart.findAll({ raw: true });
    const users = await Users.findAll({ raw: true });
    const allData = { data, usercheck, dataCart, users };
    res.render(page, allData);
};
const post_card_create = async (req, res) => {
    const dataCart = await Cart.findAll({ raw: true });
    check_admin(req, res);
    const usercheck = await session_controller.check_session_controller(
        req,
        res
    );
    const { name, category, photo, description, price } = req.body;
    try {
        Catalog.create({
            name: name,
            price: price,
            category: category,
            img_url: `/photo/${photo}`,
            description: description,
        });
    } catch (error) {
        console.log(error);
        res.send(error);
    }

    const page = "admin";
    const data = await Catalog.findAll({ raw: true });
    const allData = { data, usercheck, dataCart };
    res.render(page, allData);
};

const post_card_delete = async (req, res) => {
    check_admin(req, res);
    const { id } = req.body;
    console.log(req.body);
    try {
        await Catalog.destroy({ where: { id: id } });
        admin_controller(req, res);
        await Cart.destroy({ where: { id_item: id } });
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

const post_card_delete_reserv = async (req, res) => {
    check_admin(req, res);
    const { id } = req.body;
    console.log(req.body);
    try {
        await Catalog.update(
            {
                toggle: true,
            },
            { where: { id: id } }
        );
        await Cart.destroy({ where: { id_item: id } });
        admin_controller(req, res);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};
module.exports = {
    admin_controller,
    post_card_create,
    post_card_delete,
    post_card_delete_reserv,
};
